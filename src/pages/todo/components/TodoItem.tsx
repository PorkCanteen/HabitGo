import { Todo } from "./TodoList";

interface TodoItemParams {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemParams) => {
  return (
    <div className="flex justify-between items-center w-full  bg-white border-b-gray-100 border-b-2 h-24 ">
      {/* 左侧区域 */}
      <div className="pl-6 py-4 flex-1 active:bg-gray-100 transition-all duration-200">
        {/* 标题 */}
        {/* 描述 */}
      </div>
      {/* 右侧区域 */}
      {/* 完成次数 */}
      {/* 更多按钮 */}
    </div>
  );
};

export default TodoItem;
