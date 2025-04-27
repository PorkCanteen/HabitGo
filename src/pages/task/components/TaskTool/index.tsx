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
  const [formKey, setFormKey] = useState(0); // 添加一个key状态用于重置表单

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setFormKey(prev => prev + 1); // 增加key值使React重新创建组件
      setShowDetail(true); // 显示弹框
    }, 200);
  };
  const handleFormClose = () => {
    setShowDetail(false);
    updateList();
  };
  return (
    <div>
      <div className="absolute bottom-5 left-5">
        <i
          onClick={handleClick}
          className={`text-6xl iconfont icon-x_jiaru icon-color ${
            isAnimating ? "click-shrink-animate" : ""
          }`}
        ></i>
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
        <TaskForm key={formKey} close={handleFormClose}></TaskForm>
      </Popup>
    </div>
  );
};

export default TaskTool;
