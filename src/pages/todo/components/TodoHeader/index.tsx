const todoHeaderText = "我的待办";
const TodoHeader = () => {
  return (
    <div className="flex justify-between items-center h-20 px-4 bg-green-100 text-3xl">
      <div></div>
      <div className="text-3xl">{todoHeaderText}</div>
      <div></div>
    </div>
  );
};

export default TodoHeader;
