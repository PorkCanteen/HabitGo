import Calendar from "@/pages/components/Calendar";
import { useState, useEffect } from "react";
import "./index.scss";
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



const TaskDetail = () => {
  const [taskDetail, setTaskDetail] = useState<TaskDetailData | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { sendRequest } = useHttp();

  // 获取今天的日期字符串 (YYYY-MM-DD)
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // 获取本周开始时间
  const getWeekStart = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // 周一作为一周开始
    return new Date(now.setDate(diff));
  };

  // 获取本月开始时间
  const getMonthStart = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  };

  // 检查日期是否在指定范围内
  const isDateInRange = (dateStr: string, startDate: Date) => {
    const date = new Date(dateStr);
    return date >= startDate && date <= new Date();
  };

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

  // 处理完成日期数据，包含当天完成情况
  const getProcessedData = () => {
    if (!taskDetail) return {
      completedDates: [],
      weeklyCompletedCount: 0,
      monthlyCompletedCount: 0,
      totalCompletedCount: 0,
      continuities: 0
    };

    const todayStr = getTodayString();
    const originalCompletedDates = taskDetail.completedDates 
      ? taskDetail.completedDates.split(",").filter(date => date.trim() !== "")
      : [];
    
    // 检查今天是否已经在完成日期列表中
    const isTodayInList = originalCompletedDates.includes(todayStr);
    
    // 如果今天完成了但不在列表中，需要补充
    const shouldAddToday = taskDetail.isCompleted === 1 && !isTodayInList;
    
    const processedCompletedDates = shouldAddToday 
      ? [...originalCompletedDates, todayStr]
      : [...originalCompletedDates];
    let weeklyCount = taskDetail.weeklyCompletedCount;
    let monthlyCount = taskDetail.monthlyCompletedCount;
    let totalCount = taskDetail.totalCompletedCount;
    let continuities = taskDetail.continuities;

    if (shouldAddToday) {
      
      // 更新统计数据
      const weekStart = getWeekStart();
      const monthStart = getMonthStart();
      
      // 如果今天在本周内，本周打卡次数+1
      if (isDateInRange(todayStr, weekStart)) {
        weeklyCount += 1;
      }
      
      // 如果今天在本月内，本月打卡次数+1
      if (isDateInRange(todayStr, monthStart)) {
        monthlyCount += 1;
      }
      
      // 总打卡次数+1
      totalCount += 1;
      
      // 连续打卡天数逻辑：如果昨天也完成了，则+1，否则重置为1
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (originalCompletedDates.includes(yesterdayStr)) {
        continuities += 1;
      } else {
        continuities = 1;
      }
    }

    return {
      completedDates: processedCompletedDates,
      weeklyCompletedCount: weeklyCount,
      monthlyCompletedCount: monthlyCount,
      totalCompletedCount: totalCount,
      continuities: continuities
    };
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
    setIsExiting(true);
    // 延迟导航，等待退出动画完成
    setTimeout(() => {
      navigate("/task");
    }, 300); // 动画时长300ms
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
    // 返回列表页，使用退出动画
    setIsExiting(true);
    setTimeout(() => {
      navigate("/task");
    }, 300);
  };

  // 获取处理后的数据
  const processedData = getProcessedData();

  // 获取当前目标完成情况
  const isTargetCompleted = taskDetail 
    ? getIsTargetCompleted(taskDetail.targetType, taskDetail.targetCount, 
        taskDetail.targetType === 2 ? processedData.weeklyCompletedCount : processedData.monthlyCompletedCount)
    : false;

  return (
    <div className={`task-detail-container ${isExiting ? 'exiting' : ''}`}>
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
      
      {/* 可滚动的内容区域 */}
      <div className="content-scroll-area">
        {/* 日历 */}
        <div className="calendar-container">
        <div className="w-full border-4 rounded" style={{ 
          borderColor: "var(--color-background-primary)", 
          backgroundColor: "var(--color-primary)" 
        }}>
          <div className="section-container">
            <Calendar highlightDates={processedData.completedDates} />
          </div>
        </div>
      </div>
              {/* 目标 */}
        <div className="target-container">
          <div className="w-full border-4 rounded" style={{ 
            borderColor: "var(--color-background-primary)", 
            backgroundColor: "var(--color-primary)" 
          }}>
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
                  <span className="uncompleted">未完成</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 统计 */}
        <div className="statics-container">
          <div className="w-full border-4 rounded" style={{ 
            borderColor: "var(--color-background-primary)", 
            backgroundColor: "var(--color-primary)" 
          }}>
            <div className="section-container">打卡数据</div>
            <div className="statics-card-container">
              <div className="statics-card">
                <div className="statics-card-title">本周打卡次数</div>
                <div className="statics-card-value">{processedData.weeklyCompletedCount}</div>
              </div>
              <div className="statics-card">
                <div className="statics-card-title">本月打卡次数</div>
                <div className="statics-card-value">{processedData.monthlyCompletedCount}</div>
              </div>
              <div className="statics-card">
                <div className="statics-card-title">总打卡次数</div>
                <div className="statics-card-value">{processedData.totalCompletedCount}</div>
              </div>
              <div className="statics-card">
                <div className="statics-card-title">连续打卡天数</div>
                <div className="statics-card-value">{processedData.continuities}</div>
              </div>
            </div>
          </div>
        </div>
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
