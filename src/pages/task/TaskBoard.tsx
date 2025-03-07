import TaskHeader from "./components/TaskHeader";
import TaskList from "./components/TaskList";
import TaskTool from "./components/TaskTool";

const TaskBoard = () => {
  return (
    <div className="flex flex-col relative h-full">
      {/* 习惯头部 */}
      <TaskHeader></TaskHeader>
      {/* 习惯列表 */}
      <TaskList></TaskList>
      {/* 添加习惯-按钮 */}
      <TaskTool></TaskTool>
    </div>
  );
};

export default TaskBoard;
