import { useState } from "react";
import { List, Cell } from "react-vant";

interface TaskItem {
  id: string;
  name: string;
  description?: string;
  count: number;
  isCompleted: boolean;
}

const TaskList = () => {
  // 初始任务数据
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: "1", name: "晨跑锻炼", count: 3, isCompleted: false },
    { id: "2", name: "英语学习", count: 5, isCompleted: true },
    { id: "3", name: "项目会议", count: 2, isCompleted: false },
    { id: "4", name: "代码评审", count: 8, isCompleted: true },
  ]);

  // 处理任务点击
  const handleClick = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newIsCompleted = !task.isCompleted;
          // 只在标记为完成时增加次数，取消完成时保持次数不变
          const newCount = newIsCompleted ? task.count + 1 : task.count;
          return { ...task, isCompleted: newIsCompleted, count: newCount };
        }
        return task;
      })
    );
  };

  // 定义颜色样式
  const getStyle = (isCompleted: boolean) => ({
    color: isCompleted ? "#999" : "#333",
    textDecoration: isCompleted ? "line-through" : "none",
  });

  return (
    <div className="task-list" style={{ padding: "12px" }}>
      <List>
        {tasks.map((task) => (
          <Cell
            key={task.id}
            clickable
            onClick={() => handleClick(task.id)}
            title={<span style={getStyle(task.isCompleted)}>{task.name}</span>}
            value={
              <span style={getStyle(task.isCompleted)}>
                完成次数: {task.count}
              </span>
            }
          />
        ))}
      </List>
    </div>
  );
};

export default TaskList;
