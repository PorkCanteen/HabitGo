import { Arrow, Star, StarO } from "@react-vant/icons";
import { useState } from "react";
import { Popup } from "react-vant";
import TaskForm from "../form/TaskForm";
import "./TaskItem.scss";
const TaskItem = ({
  title,
  label,
  value,
  isCompleted,
  taskClick,
  taskType,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const handleClick = () => {
    setShowDetail(true);
  };
  return (
    <div className="flex justify-between items-center w-full  bg-white border-b-gray-100 border-b-2 h-24 ">
      {/* 左侧区域 */}
      <div
        className="pl-6 py-4 flex-1 active:bg-gray-100 transition-all duration-200"
        onClick={taskClick}
      >
        {/* 标题 */}
        <div className="flex items-center icon-wrapper">
          <span className="text-2xl">
            {isCompleted ? (
              <Star
                color="orange"
                className={`${isCompleted ? "icon active" : "icon"}`}
              ></Star>
            ) : (
              <StarO
                color="#333"
                className={`${!isCompleted ? "icon" : "icon leaving"}`}
              ></StarO>
            )}
          </span>
          <span className="text-2xl ml-2 flex items-center">
            {title}
            {taskType && (
              <span
                className="px-1 rounded-md text-white text-base ml-2"
                style={{ backgroundColor: taskType.color }}
              >
                {taskType.text}
              </span>
            )}
          </span>
        </div>
        {/* 描述 */}
        <div className="text-xl ml-8 text-gray-400 mt-1">{label}</div>
      </div>
      {/* 右侧区域 */}
      <div className="flex items-center ">
        {/* 完成次数 */}
        <div className="text-xl px-3 w-48 flex justify-end items-center text-gray-600">
          完成次数：<span className="text-green-500 text-2xl">{value}</span>
        </div>
        {/* 更多按钮 */}
        <div
          className="w-20 h-24 justify-center items-center flex text-4xl text-gray-300 active:bg-gray-100 transition-all duration-200"
          onClick={handleClick}
        >
          <Arrow></Arrow>
        </div>
      </div>
      <Popup
        visible={showDetail}
        overlay={true}
        round={true}
        closeOnClickOverlay={true}
        closeable={true}
        title="编辑任务"
        style={{ width: "80%", height: "100%" }}
        position="right"
        onClose={() => setShowDetail(false)}
      >
        <TaskForm></TaskForm>
      </Popup>
    </div>
  );
};

export default TaskItem;
