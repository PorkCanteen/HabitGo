import { Add } from "@react-vant/icons";
import { useState } from "react";
import { Popup } from "react-vant";
import TaskForm from "../../form/TaskForm";
import "./index.scss";

interface TaskToolParams {
  updateList: () => void;
}

const TaskTool = ({ updateList }: TaskToolParams) => {
  const [showDetail, setShowDetail] = useState(false); // 是否显示详情弹框
  const [isAnimating, setIsAnimating] = useState(false);
  const handleClick = () => {
    setIsAnimating(true);
    // 动画结束后重置状态
    setTimeout(() => {
      setIsAnimating(false);
      setShowDetail(true); // 显示弹框
    }, 200);
  };
  const handleFormClose = () => {
    setShowDetail(false);
    updateList();
  };
  return (
    <div>
      <div className="absolute bottom-3 left-3">
        <Add
          className={isAnimating ? "scale-animation" : ""}
          fontSize={"40px"}
          color="#e9973a"
          onClick={handleClick}
        />
      </div>
      <Popup
        visible={showDetail}
        overlay={true}
        round={true}
        closeOnClickOverlay={true}
        closeable={true}
        title="新建习惯"
        style={{ width: "85%", height: "100%" }}
        position="right"
        onClose={() => setShowDetail(false)}
      >
        <TaskForm close={handleFormClose}></TaskForm>
      </Popup>
    </div>
  );
};

export default TaskTool;
