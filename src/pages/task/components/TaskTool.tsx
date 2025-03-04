import { Add } from "@react-vant/icons";
import { useState } from "react";
import { Popup } from "react-vant";
import TaskForm from "../form/TaskForm";
const TaskTool = () => {
  const [showDetail, setShowDetail] = useState(false); // 是否显示详情弹框
  return (
    <div>
      <div className="absolute bottom-3 left-3">
        <Add fontSize={"40px"} color="skyblue" onClick={() => setShowDetail(true)} />
      </div>
      <Popup
        visible={showDetail}
        overlay={true}
        round={true}
        closeOnClickOverlay={true}
        closeable={true}
        title="新建任务"
        style={{ width: "80%", height: "100%" }}
        position="right"
        onClose={() => setShowDetail(false)}
      >
        <div className="px-16">
          <TaskForm></TaskForm>
        </div>
      </Popup>
    </div>
  );
};

export default TaskTool;
