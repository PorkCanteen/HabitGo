import Calendar from "@/pages/components/Calendar";
import { useState, useEffect } from "react";
import "./index.scss";
import { PixelBox } from "@/pages/components";
import { useNavigate, useParams } from "react-router-dom";
import { useHttp } from "@/hooks/useHttp";
import { Popup } from "react-vant";
import TaskForm from "../../form/TaskForm";

// 定义任务详情数据类型
interface TaskDetailData {
  id: number;
  userId: number;
  name: string;
  description: string;
  count: number;
  isCompleted: number;
  taskType: number;
  targetType: number; // 按日1 按周2 按月3
  targetCount: number;
  completedDates: string;
  createTime: string;
  updateTime: string;
  weeklyCompletedCount: number;
  monthlyCompletedCount: number;
  totalCompletedCount: number;
  continuities: number;
}

// 定义API响应包装类型
interface ApiResponse<T> {
  code: string;
  message: string | null;
  data: T;
}

const borderWidth = 16;

const TaskDetail = () => {
  const [taskDetail, setTaskDetail] = useState<TaskDetailData | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { sendRequest } = useHttp();

  // 获取目标类型文本
  const getTargetTypeText = (targetType: number) => {
    switch (targetType) {
      case 1:
        return "每日";
      case 2:
        return "每周";
      case 3:
        return "每月";
      default:
        return "";
    }
  };

  // 判断是否完成目标
  const getIsTargetCompleted = (targetType: number, targetCount: number, completedCount: number) => {
    switch (targetType) {
      case 1: {// 按日
        // 按日的完成状态根据isCompleted字段判断
        return taskDetail?.isCompleted === 1;
      }
      case 2: // 按周
        if (targetCount === 0) return false;
        return completedCount >= targetCount;
      case 3: // 按月
        if (targetCount === 0) return false;
        return completedCount >= targetCount;
      default:
        return false;
    }
  };

  useEffect(() => {
    const fetchTaskDetail = async () => {
      if (!id) return;
      
      const res = await sendRequest<ApiResponse<TaskDetailData>>({
        url: `/task/${id}`,
        method: "GET",
      });
      console.log('习惯详情接口返回值:', res);
      if (res && res.code === "200" && res.data) {
        setTaskDetail(res.data);
      }
    };
    
    fetchTaskDetail();
  }, [sendRequest, id]);

  const goBack = () => {
    navigate("/task");
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const onFormClose = () => {
    setShowEditForm(false);
    // 重新查询数据
    if (id) {
      const fetchTaskDetail = async () => {
        const res = await sendRequest<ApiResponse<TaskDetailData>>({
          url: `/task/${id}`,
          method: "GET",
        });
        if (res && res.code === "200" && res.data) {
          setTaskDetail(res.data);
        }
      };
      fetchTaskDetail();
    }
    // 返回列表页
    navigate("/task");
  };

  // 处理完成日期数据
  const completedDates = taskDetail?.completedDates 
    ? taskDetail.completedDates.split(",").filter(date => date.trim() !== "")
    : [];

  // 获取当前目标完成情况
  const isTargetCompleted = taskDetail 
    ? getIsTargetCompleted(taskDetail.targetType, taskDetail.targetCount, 
        taskDetail.targetType === 2 ? taskDetail.weeklyCompletedCount : taskDetail.monthlyCompletedCount)
    : false;

  return (
    <div className="task-detail-container">
      {/* 标题 */}
      <div className="header-container">
        <div className="back-btn" onClick={goBack}>
          <i className="iconfont icon-arrow-pixel-copy"></i>
        </div>
        <div className="title">{taskDetail?.name || "加载中..."}</div>
        <div className="description">{taskDetail?.description || ""}</div>
        <div className="edit-btn" onClick={handleEdit}>
          <i className="iconfont icon-x_peizhi"></i>
        </div>
      </div>
      {/* 日历 */}
      <div className="calendar-container mb-6">
        <PixelBox
          className="w-full"
          borderColor="var(--color-background-primary)"
          borderWidth={borderWidth}
          gapSize={borderWidth}
          backgroundColor="var(--color-primary)"
        >
          <div className="section-container">
            <Calendar highlightDates={completedDates} />
          </div>
        </PixelBox>
      </div>
      {/* 目标 */}
      <div className="target-container mb-6">
        <PixelBox
          className="w-full"
          borderColor="var(--color-background-primary)"
          borderWidth={borderWidth}
          gapSize={borderWidth}
          backgroundColor="var(--color-primary)"
        >
          <div className="section-container">目标</div>
          <div className="target-card-container">
            <div className="target">
              {taskDetail ? `${getTargetTypeText(taskDetail.targetType)}${taskDetail.targetType === 1 ? 1 : taskDetail.targetCount}次` : "加载中..."}
            </div>
            <div className="result flex items-center">
              {isTargetCompleted ? (
                <>
                  已完成!
                  <svg aria-hidden="true" width={24} height={24}>
                    <use xlinkHref="#icon--trophy"></use>
                  </svg>
                </>
              ) : (
                "未完成"
              )}
            </div>
          </div>
        </PixelBox>
      </div>
      {/* 统计 */}
      <div className="statics-container mb-4">
        <PixelBox
          className="w-full"
          borderColor="var(--color-background-primary)"
          borderWidth={borderWidth}
          gapSize={borderWidth}
          backgroundColor="var(--color-primary)"
        >
          <div className="section-container">打卡数据</div>
          <div className="statics-card-container">
            <div className="statics-card">
              <div className="statics-card-title">本周打卡次数</div>
              <div className="statics-card-value">{taskDetail?.weeklyCompletedCount || 0}</div>
            </div>
            <div className="statics-card">
              <div className="statics-card-title">本月打卡次数</div>
              <div className="statics-card-value">{taskDetail?.monthlyCompletedCount || 0}</div>
            </div>
            <div className="statics-card">
              <div className="statics-card-title">总打卡次数</div>
              <div className="statics-card-value">{taskDetail?.totalCompletedCount || 0}</div>
            </div>
            <div className="statics-card">
              <div className="statics-card-title">连续打卡天数</div>
              <div className="statics-card-value">{taskDetail?.continuities || 0}</div>
            </div>
          </div>
        </PixelBox>
      </div>
      
      {/* 编辑表单弹框 */}
      <Popup
        visible={showEditForm}
        overlay={true}
        round={true}
        closeOnClickOverlay={true}
        closeable={true}
        title="编辑习惯"
        style={{ width: "85%", height: "100%" }}
        position="right"
        onClose={() => setShowEditForm(false)}
      >
        {taskDetail && <TaskForm task={taskDetail} close={onFormClose} />}
      </Popup>
    </div>
  );
};

export default TaskDetail;
