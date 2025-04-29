import Calendar from "@/pages/components/Calendar";
import dayjs from "dayjs";
import { useState } from "react";
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
  return (
    <div>
      {/* 标题 */}
      <div className="header-container"></div>
      {/* 目标 */}
      <div className="target-container"></div>
      {/* 日历 */}
      <div className="calendar-container">
        <Calendar highlightDates={completedDates} />
      </div>
      {/* 统计 */}
      <div className="statics-container"></div>
    </div>
  );
};

export default TaskDetail;
