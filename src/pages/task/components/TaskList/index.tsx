import { useState, forwardRef, useImperativeHandle } from "react";
import { List } from "react-vant";
import TaskItem from "../TaskItem";
import { useHttp } from "@/hooks/useHttp";
import Notify from "@/pages/components/Notify";
import "./index.scss";
import foot1Icon from "@/assets/images/foot1.png";

// 习惯项
export interface Task {
  id?: number;
  name: string;
  description?: string;
  count: number;
  isCompleted: number;
  taskType: number;
  targetType: number;
  targetCount: number;
  updateTime?: string;
  createTime?: string;
}

// API响应类型
interface ApiResponse {
  data: Task[];
  code: string;
  message?: string;
}

// 排序类型
type SortType = "updateTime" | "taskType" | "count";

const TaskList = forwardRef((_props, ref) => {
  const { sendRequest } = useHttp();
  const [finished, setFinished] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]); // 新增状态保存所有数据
  const [activeTab, setActiveTab] = useState("全部"); // 新增状态管理
  const [animatingTab, setAnimatingTab] = useState<string | null>(null);
  // 排序状态管理
  const [sortType, setSortType] = useState<SortType>("updateTime");
  const [animatingSortType, setAnimatingSortType] = useState<boolean>(false);

  const tabs = ["全部", "主要", "次要"]; // 新增tab列表

  // 排序类型对应的显示文本
  const sortTypeText: Record<SortType, string> = {
    updateTime: "更新时间",
    taskType: "分类",
    count: "完成次数",
  };

  const fetchData = async () => {
    const res = await sendRequest<ApiResponse>({
      url: "/task/list",
      method: "GET",
    });
    if (res && res.data) {
      // 保存原始数据
      setAllTasks(res.data);
      // 按当前排序方式排序并过滤
      const filteredTasks = applySortAndFilter(res.data, sortType, activeTab);
      setTasks(filteredTasks);
    }
    setFinished(true);
  };

  // 应用排序和过滤
  const applySortAndFilter = (
    data: Task[],
    currentSortType: SortType,
    currentTab: string
  ): Task[] => {
    // 先应用过滤
    const filteredData =
      tabFilters[currentTab as keyof typeof tabFilters](data);

    // 再应用排序
    return sortData(filteredData, currentSortType);
  };

  // 排序数据
  const sortData = (data: Task[], currentSortType: SortType): Task[] => {
    return [...data].sort((a, b) => {
      if (currentSortType === "updateTime") {
        // 按更新时间降序
        return (b.updateTime || "").localeCompare(a.updateTime || "");
      } else if (currentSortType === "taskType") {
        // 按任务类型降序
        return a.taskType - b.taskType;
      } else if (currentSortType === "count") {
        // 按完成次数降序
        return b.count - a.count;
      }
      return 0;
    });
  };

  const tabFilters = {
    全部: (tasks: Task[]) => tasks,
    主要: (tasks: Task[]) => tasks.filter((task) => task.taskType === 1),
    次要: (tasks: Task[]) => tasks.filter((task) => task.taskType === 2),
  };

  const handleTabClick = (tab: string) => {
    setAnimatingTab(tab);
    setTimeout(() => {
      setAnimatingTab(null);
      setActiveTab(tab);
      // 应用排序和过滤
      const sortedAndFilteredTasks = applySortAndFilter(
        allTasks,
        sortType,
        tab
      );
      setTasks(sortedAndFilteredTasks);
    }, 200);
  };

  // 处理排序点击
  const handleSortClick = () => {
    setAnimatingSortType(true);
    setTimeout(() => {
      setAnimatingSortType(false);
      // 切换下一个排序方式
      const nextSortType = getNextSortType(sortType);
      setSortType(nextSortType);
      // 应用新的排序
      const sortedAndFilteredTasks = applySortAndFilter(
        allTasks,
        nextSortType,
        activeTab
      );
      setTasks(sortedAndFilteredTasks);
    }, 200);
  };

  // 获取下一个排序类型
  const getNextSortType = (current: SortType): SortType => {
    const sortTypes: SortType[] = ["updateTime", "taskType", "count"];
    const currentIndex = sortTypes.indexOf(current);
    return sortTypes[(currentIndex + 1) % sortTypes.length];
  };

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  // 处理习惯点击
  const handleClick = async (id: number) => {
    try {
      const res = await sendRequest<ApiResponse>({
        url: `/task/toggle/${id}`,
        method: "PUT",
      });
      if (res && res.code === "200") {
        console.log("操作成功", res.data);
      } else {
        Notify.show({ type: "danger", message: res?.message || "系统错误" });
      }
    } catch {
      Notify.show({ type: "danger", message: "系统错误，请稍后再试" });
    } finally {
      fetchData();
    }
  };

  const onListLoad = async () => {
    await fetchData();
  };

  return (
    <div className="list-container">
      <div className="flex pl-2 my-2 justify-between">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`mr-2 tab-card text-2xl px-3 py-1 border-2 cursor-pointer hover:opacity-80 transition-opacity ${
                animatingTab === tab ? "click-shrink-animate" : ""
              } ${
                activeTab === tab ? "checked" : ""
              }`}
              style={{
                borderColor: activeTab === tab
                  ? "var(--color-button-primary)"
                  : "var(--color-button-secondary)",
                backgroundColor: activeTab === tab ? "var(--color-button-primary)" : "transparent",
                color: activeTab === tab ? "white" : "inherit"
              }}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div
          style={{ color: "var(--color-text-secondary)" }}
          onClick={handleSortClick}
          className={`flex items-center cursor-pointer pr-2 ${
            animatingSortType ? "click-shrink-animate" : ""
          }`}
        >
          {sortTypeText[sortType]}
          <i className="iconfont icon-paixu ml-2 text-3xl"></i>
        </div>
      </div>
      <div className="list px-2 pb-2 overflow-y-auto">
        <List onLoad={onListLoad} finished={finished}>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div
                className="text-3xl  mb-4"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                请创建您的第一个习惯吧！
              </div>
              <img src={foot1Icon} alt="创建习惯" width={50} height={50} />
            </div>
          ) : (
            <div className="task-cards-grid">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  taskClick={() => task.id !== undefined && handleClick(task.id)}
                  updateList={fetchData}
                ></TaskItem>
              ))}
            </div>
          )}
        </List>
      </div>
    </div>
  );
});

export default TaskList;
