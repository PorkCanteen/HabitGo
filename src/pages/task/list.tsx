import { Star, StarO } from "@react-vant/icons";
import { useState } from "react";
import { List, Cell } from "react-vant";

// 任务项
interface TaskItem {
  id: string;
  name: string;
  description?: string;
  count: number;
  isCompleted: boolean;
}

const TaskList = () => {
  const [finished, setFinished] = useState(false);
  // 初始任务数据
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: "1", name: "运动", count: 3, isCompleted: false, description: "每天运动30分钟"},
    { id: "2", name: "学习React", count: 5, isCompleted: false, description: "每天学习30分钟"},
    { id: "3", name: "泡脚", count: 2, isCompleted: false, description: "每周泡脚2次" },
    { id: "4", name: "读书", count: 8, isCompleted: false },
    { id: "5", name: "喝茶", count: 0, isCompleted: false },
    { id: "6", name: "散步", count: 0, isCompleted: false },
    { id: "7", name: "准备考试", count: 0, isCompleted: false },
    { id: "8", name: "总结", count: 0, isCompleted: false },
  ]);

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
  };

  // 定义颜色样式
  const getStyle = (isCompleted: boolean) => ({
    color: isCompleted ? "#999" : "#333",
  });

  const onListLoad = async () => {
    console.log("List loaded");
    setFinished(true)
  };

  return (
    <div className="p-2 task-list">
      <List onLoad={onListLoad} finished={finished}>
        {tasks.map((task) => (
          <Cell
            key={task.id}
            onClick={() => handleClick(task.id)}
            clickable
            icon={task.isCompleted ? <Star color="orange"></Star> : <StarO color="#333"></StarO>}
            title={<span style={getStyle(task.isCompleted)}>{task.name}</span>}
            label={<span className="text-zinc-400">{task.description}</span>}
            value={
              <span style={getStyle(task.isCompleted)}>
                <span className="text-">完成次数: </span>{task.count}
              </span>
            }
          ></Cell>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
