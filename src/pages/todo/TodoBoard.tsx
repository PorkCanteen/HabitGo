import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
const TodoBoard = () => {
  return (
    <div className="flex flex-col relative h-full">
      {/* 待办头部 */}
      <TodoHeader></TodoHeader>
      {/* 待办列表 */}
      <TodoList></TodoList>
      {/* 添加待办-按钮 */}
    </div>
  );
};

export default TodoBoard;
