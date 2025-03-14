import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoTool from "./components/TodoTool";
const TodoBoard = () => {
  const updateList = () => {
    // 调用子组件方法更新列表
  };
  return (
    <div className="flex flex-col relative h-full">
      {/* 待办头部 */}
      <TodoHeader></TodoHeader>
      {/* 待办列表 */}
      <TodoList></TodoList>
      {/* 添加待办-按钮 */}
       <TodoTool updateList={updateList}></TodoTool>
    </div>
  );
};

export default TodoBoard;
