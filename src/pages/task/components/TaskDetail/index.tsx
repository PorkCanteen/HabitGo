import Calendar from "@/pages/components/Calendar";
import dayjs from "dayjs";
import { useState } from "react";
import "./index.scss";
import { PixelBox } from "@/pages/components";

const borderWidth = 16;

const TaskDetail = () => {
  // 模拟一些打卡记录
  const [completedDates] = useState<string[]>([
    // 过去几天的随机打卡记录
    dayjs().format("YYYY-MM-DD"),
    dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    dayjs().subtract(3, "day").format("YYYY-MM-DD"),
    dayjs().subtract(5, "day").format("YYYY-MM-DD"),
    dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    dayjs().subtract(10, "day").format("YYYY-MM-DD"),
    // 上个月的一些日期
    dayjs().subtract(1, "month").date(5).format("YYYY-MM-DD"),
    dayjs().subtract(1, "month").date(10).format("YYYY-MM-DD"),
    dayjs().subtract(1, "month").date(15).format("YYYY-MM-DD"),
    dayjs().subtract(1, "month").date(20).format("YYYY-MM-DD"),
  ]);
  const goBack = () => {
    // navigate(-1);
  };
  return (
    <div className="task-detail-container">
      {/* 标题 */}
      <div className="header-container">
        <div className="back-btn" onClick={goBack}>
          <i className="iconfont icon-arrow-pixel-copy"></i>
        </div>
        <div className="title">学习</div>
        <div className="description">学习+开发个人项目</div>
        <div className="edit-btn">
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
            <div className="target">每周3次</div>
            <div className="result">已完成!</div>
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
              <div className="statics-card-value">10</div>
            </div>
            <div className="statics-card">
              <div className="statics-card-title">本月打卡次数</div>
              <div className="statics-card-value">10</div>
            </div>
            <div className="statics-card">
              <div className="statics-card-title">总打卡次数</div>
              <div className="statics-card-value">10</div>
            </div>
            <div className="statics-card">
              <div className="statics-card-title">连续打卡天数</div>
              <div className="statics-card-value">10</div>
            </div>
          </div>
        </PixelBox>
      </div>
    </div>
  );
};

export default TaskDetail;
