import { useState } from "react";
import { Popup } from "react-vant";
import TaskForm from "../../form/TaskForm";
import "./index.scss";
import { Task } from "../TaskList";
import { useNavigate } from "react-router-dom";
import taskImage from "@/assets/images/dog2.png";
import taskFinishedImage from "@/assets/images/dog1.png";
import detailIcon from "@/assets/images/more.svg";

interface TaskItemParams {
  task: Task;
  taskClick: () => void;
  updateList: () => void;
}

const taskTypeMap: Record<number, { text: string; color: string }> = {
  1: {
    text: "主",
    color: "var(--color-red)",
  },
  2: {
    text: "次",
    color: "var(--color-orange)",
  },
};

const TaskItem = ({ taskClick, task, updateList }: TaskItemParams) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    // 携带id跳转到详情页
    navigate(`/task/detail/${task.id}`);
  };

  const onFormClose = () => {
    setShowDetail(false);
    updateList();
  };

  const handleCardClick = () => {
    // 如果任务从未完成变为完成，触发跳动动画
    if (task.isCompleted === 0) {
      setIsAnimating(true);
      // 动画结束后清除动画状态
      setTimeout(() => {
        setIsAnimating(false);
      }, 400); // 与动画持续时间一致
    }
    
    // 调用原来的点击处理函数
    taskClick();
  };

  return (
    <div className="task-card-container">
      <div className={`task-card ${task.isCompleted === 0 ? 'task-card-incomplete' : 'task-card-completed'} ${isAnimating ? 'card-jump-animation' : ''}`} onClick={handleCardClick}>
        {/* 卡片内容区域 */}
        <div className="card-content">
          {/* 任务状态图片 */}
          <div className={task.isCompleted === 0 ? 'task-image-unfinished' : 'task-image'}>
            <img 
              className={task.isCompleted === 0 ? 'img-unfinished' : ''}
              src={task.isCompleted === 1 ? taskFinishedImage : taskImage} 
              alt={task.isCompleted === 1 ? "已完成" : "未完成"}
            />
          </div>
          
          {/* 习惯名称和类型标签 - 在一行显示 */}
          <div className="habit-name">
            <div className="name-text">{task.name}</div>
            {taskTypeMap[task.taskType] && (
              <div
                className="type-tag-text"
                style={{ backgroundColor: taskTypeMap[task.taskType].color }}
              >
                {taskTypeMap[task.taskType].text}
              </div>
            )}
          </div>

          {/* 完成次数 */}
          <div className="completion-count">
            <div className="count-label">完成次数</div>
            <div className="count-value">{task.count}</div>
          </div>
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
