import { Todo } from "../TodoList";
import "./index.scss";
import { Popup } from "react-vant";
import TodoForm from "../../form/TodoForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import pig1Image from "@/assets/images/pig1.png";
import pig2Image from "@/assets/images/pig2.png";
import pig3Image from "@/assets/images/pig3.png";
import detailIcon from "@/assets/images/more.svg";
import footIcon from "@/assets/images/foot2.png";

interface TodoItemParams {
  todo: Todo;
  todoClick: () => void;
  updateList: () => void;
}

const TodoItem = ({ todo, todoClick, updateList }: TodoItemParams) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleTodoClick = () => {
    if (!todo.isFinished) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        todoClick();
      }, 500);
    } else {
      todoClick();
    }
  };

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    if (todo.id) {
      navigate(`/todo/detail/${todo.id}`);
    }
  };

  const onFormClose = () => {
    setShowDetail(false);
    updateList();
  };

  const getPigImage = () => {
    if (todo.isFinished) {
      return pig3Image; // 已完成显示pig3
    }
    
    const dayDiff = calculateDayDifference(todo.finishDate);
    if (dayDiff.isDelay) {
      return pig2Image; // 已超期显示pig2
    }
    
    return pig1Image; // 未超期显示pig1
  };

  return (
    <div className="todo-card-container">
      <div 
        className={`todo-card ${todo.isFinished ? "todo-card-completed" : "todo-card-incomplete"} ${
          !todo.isFinished && calculateDayDifference(todo.finishDate).isDelay ? "todo-card-overdue" : ""
        }`}
      >
        {/* 左侧图片区域 */}
        <div className="todo-image" onClick={handleTodoClick}>
          <img 
            src={getPigImage()} 
            alt="待办图片"
            className={`todo-img ${isAnimating ? "todo-img-animate" : ""}`}
          />
        </div>

        {/* 右侧文字内容区域 */}
        <div className="todo-content">
          {/* 标题行 */}
          <div className="todo-title">
            <span className={`title-text ${todo.isFinished ? "line-through text-gray-500" : ""}`}>
              {todo.name}
              {todo.type === 1 && (
                <img src={footIcon} alt="紧急" width={24} height={24} className="ml-1" />
              )}
            </span>
          </div>

          {/* 时间信息行 */}
          <div className="todo-time-info">
            {/* 计划时间 */}
            <span className={`plan-time ${todo.isFinished ? "text-gray-500" : ""}`}>
              {dayjs(todo.finishDate).format("YYYY-MM-DD")}
            </span>
            {/* 剩余/超期时间 */}
            {!todo.isFinished && (
              <span
                className={`time-badge ${
                  calculateDayDifference(todo.finishDate).isDelay
                    ? "time-badge-delay"
                    : "time-badge-normal"
                }`}
              >
                {calculateDayDifference(todo.finishDate).text}
              </span>
            )}
          </div>

          {/* 内容描述行 */}
          {!todo.isFinished && todo.description && (
            <div className="todo-description">
              {todo.description
                .split("\n")
                .map((line, index) => <div key={index}>{line}</div>)}
            </div>
          )}
        </div>

        {/* 详情按钮 - 右下角 */}
        <div className="detail-btn" onClick={handleDetailClick}>
          <img src={detailIcon} alt="详情" />
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

const calculateDayDifference = (finishDate: string | Date) => {
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
