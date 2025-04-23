import { Todo } from "../TodoList";
import "./index.scss";
import { Popup } from "react-vant";
import TodoForm from "../../form/TodoForm";
import { useState } from "react";
import PixelBox from "@/pages/components/PixelBox";

interface TodoItemParams {
  todo: Todo;
  todoClick: () => void;
  updateList: () => void;
}

const TodoItem = ({ todo, todoClick, updateList }: TodoItemParams) => {
  const [showDetail, setShowDetail] = useState(false);
  const handleClick = () => {
    setShowDetail(true);
  };
  const onFormClose = () => {
    setShowDetail(false);
    updateList();
  };
  return (
    <div
      className={`flex justify-between items-center w-full  ${
        todo.isFinished ? "bg-gray-50" : "bg-white"
      } h-fit `}
      style={{ borderBottom: "4px solid #f7f7f6" }}
    >
      {/* 左侧区域 */}
      <div
        className="pl-6 py-4 flex-1 active:bg-gray-100 transition-all duration-200"
        onClick={todoClick}
      >
        {/* 标题 */}
        <div className="flex items-center icon-wrapper">
          <span className="text-2xl">
            {todo.isFinished ? (
              <svg aria-hidden="true" width={20} height={20}>
                <use xlinkHref="#icon-xiangsu_jiangbei"></use>
              </svg>
            ) : calculateDayDifference(todo.finishDate).isDelay ? (
              <svg aria-hidden="true" width={20} height={20}>
                <use xlinkHref="#icon--shy"></use>
              </svg>
            ) : (
              <svg aria-hidden="true" width={20} height={20}>
                <use xlinkHref="#icon--happy"></use>
              </svg>
            )}
          </span>
          <span
            className={`text-3xl ml-2 flex items-center justify-between w-full ${
              todo.isFinished ? "line-through text-gray-500" : ""
            }`}
          >
            {/* 名称 */}
            <span>{todo.name}</span>
            {/* 计划时间 */}
            <span className="text-2xl">计划时间：{todo.finishDate}</span>
          </span>
        </div>
        {/* 剩余/超期时间 */}
        {!todo.isFinished && (
          <PixelBox
            className="ml-10"
            borderColor={
              calculateDayDifference(todo.finishDate).isDelay
                ? "bg-red-500"
                : "bg-green-500"
            }
          >
            <div
              className={`text-2xl px-3 ${
                calculateDayDifference(todo.finishDate).isDelay
                  ? "bg-red-500"
                  : "bg-green-500"
              } text-white mt-1 w-fit`}
            >
              {calculateDayDifference(todo.finishDate).text}
            </div>
          </PixelBox>
        )}
        {/* 描述 */}
        {!todo.isFinished && (
          <div className="text-2xl ml-10 text-gray-500 mt-1">
            {todo.description &&
              todo.description
                .split("\n")
                .map((line, index) => <div key={index}>{line}</div>)}
          </div>
        )}
      </div>
      {/* 右侧区域 */}
      <div className="flex items-center ">
        {/* 更多按钮 */}
        <div
          className="w-20 h-24 justify-center items-center flex text-4xl text-gray-300 active:bg-gray-100 transition-all duration-200"
          onClick={handleClick}
        >
          <svg aria-hidden="true" width={18} height={18}>
            <use xlinkHref="#icon-xiangsujiantou"></use>
          </svg>
        </div>
      </div>
      <Popup
        visible={showDetail}
        overlay={true}
        round={true}
        closeOnClickOverlay={true}
        closeable={true}
        title="编辑待办"
        style={{ width: "85%", height: "100%" }}
        position="right"
        onClose={() => setShowDetail(false)}
      >
        <TodoForm todo={todo} close={onFormClose}></TodoForm>
      </Popup>
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
