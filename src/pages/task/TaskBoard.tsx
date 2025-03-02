import TaskHeader from "./components/TaskHeader";
import TaskList from "./components/TaskList";
import TaskTool from "./components/TaskTool";

const TaskBoard = () => {
  return (
    <div className="flex flex-col relative h-full">
      {/* 任务头部 */}
      <TaskHeader></TaskHeader>
      {/* 任务列表 */}
      <TaskList></TaskList>
      {/* 添加任务-按钮 */}
      <TaskTool></TaskTool>
    </div>
  );
};

export default TaskBoard;
