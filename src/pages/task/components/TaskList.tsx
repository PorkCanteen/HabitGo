import { useContext, useEffect, useState } from "react";
import { List } from "react-vant";
import CountContext from "@/CountContext";
import { size, filter } from "lodash";
import TaskItem from "./TaskItem";

const taskTypeMap = {
  1: {
    text: "主要任务",
    color: "#ee7068",
  },
};

// 任务项
interface TaskItem {
  id: string;
  name: string;
  description?: string;
  count: number;
  isCompleted: boolean;
  taskType: number;
}
const taskListData = [
  {
    id: "1",
    name: "运动",
    count: 3,
    isCompleted: false,
    description: "每天运动30分钟",
    taskType: 1,
  },
  {
    id: "2",
    name: "学习React",
    count: 5,
    isCompleted: false,
    description: "每天学习30分钟",
    taskType: 1,
  },
  {
    id: "3",
    name: "泡脚",
    count: 2,
    isCompleted: false,
    description: "每周泡脚2次",
    taskType: 1,
  },
  {
    id: "4",
    name: "读书",
    count: 8,
    isCompleted: true,
    description: "读万卷书",
    taskType: 2,
  },
  {
    id: "5",
    name: "喝茶",
    count: 0,
    isCompleted: false,
    description: "多喝水",
    taskType: 0,
  },
  {
    id: "6",
    name: "散步",
    count: 1523,
    isCompleted: false,
    description: "gogogo",
    taskType: 0,
  },
  {
    id: "7",
    name: "准备考试",
    count: 142,
    isCompleted: false,
    description: "背题背题",
    taskType: 0,
  },
  {
    id: "8",
    name: "总结",
    count: 15,
    isCompleted: false,
    description: "温故而知新",
    taskType: 0,
  },
];

const TaskList = () => {
  // 修改父组件任务数量
  const countContext = useContext(CountContext);
  const [finished, setFinished] = useState(false);
  // 初始任务数据
  const [tasks, setTasks] = useState<TaskItem[]>(taskListData);

  // 计算未完成任务数量
  const getUnfinishedTaskCount = () => {
    return size(filter(tasks, (task) => !task.isCompleted));
  };

  // 处理任务点击
  const handleClick = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const complete = !task.isCompleted;
          // 只在标记为完成时增加次数，取消完成时保持次数不变
          const newCount = complete ? task.count + 1 : task.count;
          return { ...task, isCompleted: complete, count: newCount };
        }
        return task;
      })
    );
    countContext?.setTaskCount(getUnfinishedTaskCount());
  };

  useEffect(() => {
    countContext?.setTaskCount(getUnfinishedTaskCount());
  });

  const onListLoad = async () => {
    setFinished(true);
  };

  return (
    <div className=" p-2 h-full overflow-y-auto">
      <List onLoad={onListLoad} finished={finished}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.name}
            label={task.description}
            value={task.count}
            isCompleted={task.isCompleted}
            taskType={taskTypeMap[task.taskType]}
            taskClick={() => handleClick(task.id)}
          ></TaskItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
