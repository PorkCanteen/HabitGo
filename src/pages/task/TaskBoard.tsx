import TaskHeader from "./components/TaskHeader";
import TaskList from "./components/TaskList";
import TaskTool from "./components/TaskTool";

const TaskBoard = () => {
  const updateList = () => {
    // todo: 父组件调用子组件方法更新列表
  };
  return (
    <div className="flex flex-col relative h-full">
      {/* 习惯头部 */}
      <TaskHeader></TaskHeader>
      {/* 习惯列表 */}
      <TaskList></TaskList>
      {/* 添加习惯-按钮 */}
      <TaskTool updateList={updateList}></TaskTool>
    </div>
  );
};

export default TaskBoard;
