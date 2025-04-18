import { useState, forwardRef, useImperativeHandle } from "react";
import { List } from "react-vant";
import TaskItem from "../TaskItem";
import { useHttp } from "@/hooks/useHttp";
import "@/styles/common.scss";
import Notify from "@/pages/components/Notify";

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

  const tabs = ["全部", "主要", "次要"]; // 新增tab列表

  const fetchData = async () => {
    const res: any = await sendRequest({
      url: "/task/list",
      method: "GET",
    });
    if (res.data && res.data.length) {
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
    setActiveTab(tab);
    const filter = tabFilters[tab as keyof typeof tabFilters];
    setTasks(filter(allTasks));
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
      Notify.show({ type: "success", message: '操作成功' });
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
      <div className="flex pl-2 mt-2">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-card ${activeTab === tab ? "checked" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="list px-2 pb-2 overflow-y-auto">
        <List onLoad={onListLoad} finished={finished}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              taskClick={() => task.id !== undefined && handleClick(task.id)}
              updateList={fetchData}
            ></TaskItem>
          ))}
        </List>
      </div>
    </div>
  );
});

export default TaskList;
