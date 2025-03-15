import { useState, forwardRef, useImperativeHandle } from "react";
import { List } from "react-vant";
import TaskItem from "../TaskItem";
import { useHttp } from "@/hooks/useHttp";

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

const TaskList = forwardRef((props, ref) => {
  const { sendRequest } = useHttp();
  const [finished, setFinished] = useState(false);
  // 初始习惯数据
  const [tasks, setTasks] = useState<Task[]>([]);
  const fetchData = async () => {
    const res: any = await sendRequest({
      url: "/task/list",
      method: "GET",
    });
    if (res.data && res.data.length) {
      setTasks(res.data);
    }
    setFinished(true);
  };

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  // 处理习惯点击
  const handleClick = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const complete = task.isCompleted === 1 ? 0 : 1;
          // 只在标记为完成时增加次数，取消完成时保持次数不变
          const newCount = complete ? task.count + 1 : task.count;
          return { ...task, isCompleted: complete, count: newCount };
        }
        return task;
      })
    );
  };

  const onListLoad = async () => {
    await fetchData();
  };

  return (
    <div className=" p-2 h-full overflow-y-auto">
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
  );
});

export default TaskList;
