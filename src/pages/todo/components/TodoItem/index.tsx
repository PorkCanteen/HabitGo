import { Arrow, Checked, Passed } from "@react-vant/icons";
import { Todo } from "../TodoList";
import "./index.scss";

interface TodoItemParams {
  todo: Todo;
  todoClick: () => void;
}

const TodoItem = ({ todo, todoClick }: TodoItemParams) => {
  return (
    <div className="flex justify-between items-center w-full  bg-white border-b-gray-100 border-b-2 h-fit ">
      {/* 左侧区域 */}
      <div
        className="pl-6 py-4 flex-1 active:bg-gray-100 transition-all duration-200"
        onClick={todoClick}
      >
        {/* 标题 */}
        <div className="flex items-center icon-wrapper">
          <span className="text-2xl">
            {todo.isFinished ? (
              <Checked
                color="orange"
                className={`${todo.isFinished ? "icon active" : "icon"}`}
              ></Checked>
            ) : (
              <Passed
                color="#333"
                className={`${!todo.isFinished ? "icon" : "icon leaving"}`}
              ></Passed>
            )}
          </span>
          <span
            className={`text-2xl ml-2 flex items-center justify-between w-full ${
              todo.isFinished ? "line-through" : ""
            }`}
          >
            <span>{todo.name}</span>
            <span className="text-xl">计划时间：{todo.finishDate}</span>
          </span>
        </div>
        {/* 描述 */}
        <div className="text-xl ml-8 text-gray-400 mt-1">
          {todo.description}
        </div>
      </div>
      {/* 右侧区域 */}
      <div className="flex items-center ">
        {/* 更多按钮 */}
        <div className="w-20 h-24 justify-center items-center flex text-4xl text-gray-300 active:bg-gray-100 transition-all duration-200">
          <Arrow></Arrow>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
