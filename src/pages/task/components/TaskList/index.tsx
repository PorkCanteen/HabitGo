import { useState } from "react";
import { List } from "react-vant";
import { size, filter } from "lodash";
import TaskItem from "../TaskItem";

// 习惯项
export interface Task {
  id: string;
  name: string;
  description?: string;
  count: number;
  isCompleted: boolean;
  taskType: number;
  targetType: number;
  targetCount: number;
}
const taskListData = [
  {
    id: "1",
    name: "运动",
    count: 3,
    isCompleted: false,
    description: "每天运动30分钟",
    taskType: 1,
    targetType: 1,
    targetCount: 1,
  },
  {
    id: "2",
    name: "学习React",
    count: 5,
    isCompleted: false,
    description: "每天学习30分钟",
    taskType: 1,
    targetType: 1,
    targetCount: 1,
  },
  {
    id: "3",
    name: "泡脚",
    count: 2,
    isCompleted: false,
    description: "每周泡脚2次",
    taskType: 1,
    targetType: 2,
    targetCount: 2,
  },
  {
    id: "4",
    name: "读书",
    count: 8,
    isCompleted: true,
    description: "读万卷书",
    taskType: 2,
    targetType: 1,
    targetCount: 1,
  },
  {
    id: "5",
    name: "喝茶",
    count: 0,
    isCompleted: false,
    description: "多喝水",
    taskType: 0,
    targetType: 1,
    targetCount: 1,
  },
  {
    id: "6",
    name: "散步",
    count: 1523,
    isCompleted: false,
    description: "gogogo",
    taskType: 0,
    targetType: 1,
    targetCount: 1,
  },
  {
    id: "7",
    name: "准备考试",
    count: 142,
    isCompleted: false,
    description: "背题背题",
    taskType: 0,
    targetType: 1,
    targetCount: 1,
  },
  {
    id: "8",
    name: "总结",
    count: 15,
    isCompleted: false,
    description: "温故而知新",
    taskType: 0,
    targetType: 1,
    targetCount: 1,
  },
];

const TaskList = () => {
  const [finished, setFinished] = useState(false);
  // 初始习惯数据
  const [tasks, setTasks] = useState<Task[]>(taskListData);

  // 计算未完成习惯数量
  const getUnfinishedTaskCount = () => {
    return size(filter(tasks, (task) => !task.isCompleted));
  };

  // 处理习惯点击
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
  };

  const onListLoad = async () => {
    setFinished(true);
  };

  return (
    <div className=" p-2 h-full overflow-y-auto">
      <List onLoad={onListLoad} finished={finished}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            taskClick={() => handleClick(task.id)}
          ></TaskItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
