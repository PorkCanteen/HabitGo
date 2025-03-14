import { Add } from "@react-vant/icons";
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
        title="新建待办"
        style={{ width: "90%", height: "100%" }}
        position="right"
        onClose={() => setShowDetail(false)}
      >
        <TodoForm close={handleFormClose}></TodoForm>
      </Popup>
    </div>
  );
};

export default TodoTool;
