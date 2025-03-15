import { Arrow, Checked, Passed } from "@react-vant/icons";
import { Todo } from "../TodoList";
import "./index.scss";

interface TodoItemParams {
  todo: Todo;
  todoClick: () => void;
}

const TodoItem = ({ todo, todoClick }: TodoItemParams) => {
  return (
    <div className={`flex justify-between items-center w-full  ${todo.isFinished ? "bg-gray-50" : "bg-white"} border-b-gray-100 border-b-2 h-fit `}>
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
              todo.isFinished ? "line-through text-gray-500" : ""
            }`}
          >
            {/* 名称 */}
            <span>{todo.name}</span>
            {/* 计划时间 */}
            <span className="text-xl">计划时间：{todo.finishDate}</span>
          </span>
        </div>
        {/* 剩余/超期时间 */}
        {!todo.isFinished && (
          <div
            className={`text-xl ml-8 px-2 ${
              calculateDayDifference(todo.finishDate).isDelay
                ? "bg-red-500"
                : "bg-green-500"
            } text-white rounded-md mt-1 w-fit`}
          >
            {calculateDayDifference(todo.finishDate).text}
          </div>
        )}
        {/* 描述 */}
        {!todo.isFinished && (
          <div className="text-xl ml-8 text-gray-500 mt-1">
            {todo.description && todo.description.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
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

const calculateDayDifference = (finishDate: string) => {
  const today = new Date();
  const targetDate = new Date(finishDate);
  const timeDiff = targetDate.getTime() - today.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const text = dayDiff >= 0 ? `剩余${dayDiff}天` : `超期${-dayDiff}天`;
  const isDelay = dayDiff < 0;
  return {
    text,
    isDelay,
  };
};
