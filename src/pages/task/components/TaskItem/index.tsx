import { Arrow } from "@react-vant/icons";
import { useState, useEffect } from "react";
import { Popup } from "react-vant";
import TaskForm from "../../form/TaskForm";
import "./index.scss";
import { Task } from "../TaskList";

interface TaskItemParams {
  task: Task;
  taskClick: () => void;
  updateList: () => void;
}
// 图标大小
const IconSize = 16;

const taskTypeMap: Record<number, { text: string; color: string }> = {
  1: {
    text: "主要",
    color: "#ee7068",
  },
  2: {
    text: "次要",
    color: "#f8a128",
  },
};

const TaskItem = ({ taskClick, task, updateList }: TaskItemParams) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 监听task.isCompleted的变化，当从false变为true时触发动画
  useEffect(() => {
    if (task.isCompleted) {
      setIsAnimating(true);
      // 动画结束后重置状态
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [task.isCompleted]);

  const handleClick = () => {
    setShowDetail(true);
  };
  const onFormClose = () => {
    setShowDetail(false);
    updateList();
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
            {task.isCompleted ? (
              <div className="coin-container relative">
                {/* 椭圆形影子 */}
                {(isAnimating || task.isCompleted) && (
                  <div className={isAnimating ? "coin-shadow shadow-animation" : "coin-shadow"}></div>
                )}
                <svg
                  className={`icon ${isAnimating ? "coin-jump-animation" : ""}`}
                  aria-hidden="true"
                  width={IconSize}
                  height={IconSize}
                >
                  <use xlinkHref="#icon-xiangsu_jinbi"></use>
                </svg>
              </div>
            ) : (
              <svg
                className="icon opacity-50"
                aria-hidden="true"
                width={IconSize}
                height={IconSize}
              >
                <use xlinkHref="#icon-xiangsu_jinbi1"></use>
              </svg>
            )}
          </span>
          <span className="text-2xl ml-2 flex items-center">
            {task.name}
            {taskTypeMap[task.taskType] && (
              <span
                className="px-1 rounded-md text-white text-base ml-2"
                style={{ backgroundColor: taskTypeMap[task.taskType].color }}
              >
                {taskTypeMap[task.taskType].text}
              </span>
            )}
          </span>
        </div>
        {/* 描述 */}
        <div className="text-xl ml-8 text-gray-400 mt-1">
          {task.description}
        </div>
      </div>
      {/* 右侧区域 */}
      <div className="flex items-center ">
        {/* 完成次数 */}
        <div className="text-xl px-3 w-48 flex justify-end items-center text-gray-600">
          完成次数：
          <span className="text-green-500 text-2xl">{task.count}</span>
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
        title="编辑习惯"
        style={{ width: "85%", height: "100%" }}
        position="right"
        onClose={() => setShowDetail(false)}
      >
        <TaskForm task={task} close={onFormClose}></TaskForm>
      </Popup>
    </div>
  );
};

export default TaskItem;
