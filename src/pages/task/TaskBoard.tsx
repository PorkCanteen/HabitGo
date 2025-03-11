import { useRef } from "react";
import TaskHeader from "./components/TaskHeader";
import TaskList from "./components/TaskList";
import TaskTool from "./components/TaskTool";

const TaskBoard = () => {
  interface TaskListRef {
    fetchData: () => void;
  }
  const taskListRef = useRef<TaskListRef | null>(null);
  const updateList = () => {
    // 调用子组件方法更新列表
    taskListRef.current?.fetchData();
  };
  return (
    <div className="flex flex-col relative h-full">
      {/* 习惯头部 */}
      <TaskHeader></TaskHeader>
      {/* 习惯列表 */}
      <TaskList ref={taskListRef}></TaskList>
      {/* 添加习惯-按钮 */}
      <TaskTool updateList={updateList}></TaskTool>
    </div>
  );
};

export default TaskBoard;
