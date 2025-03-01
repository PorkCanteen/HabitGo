import TaskHeader from "./components/TaskHeader";
import TaskList from "./components/TaskList";
import TaskTool from "./components/TaskTool";

const TaskBoard = () => {
  return (
    <div className="flex flex-col">
      <TaskHeader></TaskHeader>
      <TaskList></TaskList>
      <TaskTool></TaskTool>
    </div>
  );
};

export default TaskBoard;
