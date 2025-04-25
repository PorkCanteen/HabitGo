import { useState, forwardRef, useImperativeHandle } from "react";
import { List } from "react-vant";
import TaskItem from "../TaskItem";
import { useHttp } from "@/hooks/useHttp";
import Notify from "@/pages/components/Notify";
import PixelBox from "@/pages/components/PixelBox";

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
}

const TaskList = forwardRef((_props, ref) => {
  const { sendRequest } = useHttp();
  const [finished, setFinished] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]); // 新增状态保存所有数据
  const [activeTab, setActiveTab] = useState("全部"); // 新增状态管理
  const [animatingTab, setAnimatingTab] = useState<string | null>(null);

  const tabs = ["全部", "主要", "次要"]; // 新增tab列表

  const fetchData = async () => {
    const res: any = await sendRequest({
      url: "/task/list",
      method: "GET",
    });
    if (res.data) {
      setAllTasks(res.data); // 保存所有数据
      setTasks(res.data); // 初始化显示所有数据
    }
    setFinished(true);
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
      const filter = tabFilters[tab as keyof typeof tabFilters];
      setTasks(filter(allTasks));
    }, 200);
  };

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  // 处理习惯点击
  const handleClick = async (id: number) => {
    const res: any = await sendRequest({
      url: `/task/toggle/${id}`,
      method: "PUT",
    });
    if (res && res.code === "200") {
      Notify.show({ type: "success", message: "操作成功" });
    } else {
      Notify.show({ type: "danger", message: res?.message || "系统错误" });
    }
    fetchData();
  };

  const onListLoad = async () => {
    await fetchData();
  };

  return (
    <div className="list-container">
      <div className="flex pl-2 my-2">
        {tabs.map((tab) => (
          <PixelBox
            key={tab}
            className={`mr-2 ${
              animatingTab === tab ? "click-shrink-animate" : ""
            }`}
            borderColor={
              activeTab === tab
                ? "var(--color-button-primary)"
                : "var(--color-button-secondary)"
            }
          >
            <div
              className={`tab-card text-2xl px-3 py-1 ${
                activeTab === tab ? "checked" : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          </PixelBox>
        ))}
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
              <svg aria-hidden="true" width={40} height={40}>
                <use xlinkHref="#icon--happy"></use>
              </svg>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                taskClick={() => task.id !== undefined && handleClick(task.id)}
                updateList={fetchData}
              ></TaskItem>
            ))
          )}
        </List>
      </div>
    </div>
  );
});

export default TaskList;
