import "./index.scss";

const taskHeaderText = "我的习惯";
const TaskHeader = () => {
  return (
    <div className="task-header-container flex justify-center items-center h-24 px-4 text-3xl shrink-0">
      <div className="title font-bold">{taskHeaderText}</div>
    </div>
  );
};

export default TaskHeader;
