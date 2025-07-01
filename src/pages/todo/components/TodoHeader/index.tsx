import "./index.scss";

const todoHeaderText = "我的待办";
const TodoHeader = () => {
  return (
    <div className="todo-header-container flex justify-center items-center h-24 px-4 text-3xl shrink-0">
      <div className="title font-bold">{todoHeaderText}</div>
    </div>
  );
};

export default TodoHeader;
