import { useState } from "react";
import { Popup } from "react-vant";
import TodoForm from "../../form/TodoForm";
import "./index.scss";

interface TodoToolParams {
  updateList: () => void;
}

const TodoTool = ({ updateList }: TodoToolParams) => {
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
      <div className="todo-tool-container">
        <i
          onClick={handleClick}
          className={`todo-icon-color text-7xl iconfont icon-jia ${
            isAnimating ? "click-shrink-animate" : ""
          } `}
        ></i>
      </div>
      <Popup
        visible={showDetail}
        overlay={true}
        round={true}
        closeOnClickOverlay={true}
        closeable={true}
        title="新建待办"
        style={{ width: "85%", height: "100%" }}
        position="right"
        onClose={() => setShowDetail(false)}
      >
        <TodoForm key={formKey} close={handleFormClose}></TodoForm>
      </Popup>
    </div>
  );
};

export default TodoTool;
