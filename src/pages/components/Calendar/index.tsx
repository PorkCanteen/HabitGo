import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import "./index.scss";

interface CalendarProps {
  // 可以高亮显示的日期数组，格式为 'YYYY-MM-DD'
  highlightDates?: string[];
  // 当选择日期时的回调
  onDateSelect?: (date: string) => void;
  // 初始显示的年月，默认为当前月
  initialDate?: string;
}

interface DayItem {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isHighlighted: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  highlightDates = [],
  onDateSelect,
  initialDate,
}) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [currentDate, setCurrentDate] = useState(
    initialDate ? dayjs(initialDate) : dayjs()
  );
  const [days, setDays] = useState<DayItem[]>([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const calendarRef = useRef<HTMLDivElement>(null);
  const swipeThreshold = 50; // 滑动阈值
  const [isSwiping, setIsSwiping] = useState(false);

  // 星期几的标题
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

  // 获取某月的所有日期
  const getDaysInMonth = (date: dayjs.Dayjs) => {
    const daysInMonth: DayItem[] = [];
    const monthStart = date.startOf("month");
    const monthEnd = date.endOf("month");
    const startDate = monthStart.startOf("week");
    const endDate = monthEnd.endOf("week");

    // 获取日历显示的所有日期（包括上月和下月的部分日期）
    let currentDay = startDate;
    while (currentDay.isBefore(endDate) || currentDay.isSame(endDate, "day")) {
      const dateStr = currentDay.format("YYYY-MM-DD");
      daysInMonth.push({
        date: dateStr,
        day: currentDay.date(),
        isCurrentMonth: currentDay.month() === date.month(),
        isToday: dateStr === today,
        isHighlighted: highlightDates.includes(dateStr),
      });
      currentDay = currentDay.add(1, "day");
    }

    return daysInMonth;
  };

  // 更新日历数据
  useEffect(() => {
    setDays(getDaysInMonth(currentDate));
  }, [currentDate, highlightDates]);

  // 处理日期选择
  const handleDateClick = (day: DayItem, e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡

    // 如果正在滑动，则不处理点击事件
    if (isSwiping) return;

    if (onDateSelect && day.isCurrentMonth) {
      onDateSelect(day.date);
    }
  };

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > swipeThreshold) {
      // 向左滑动
      const newDate = dayjs(currentDate).add(1, "month");
      setCurrentDate(newDate);
    } else if (touchEnd - touchStart > swipeThreshold) {
      // 向右滑动
      const newDate = dayjs(currentDate).subtract(1, "month");
      setCurrentDate(newDate);
    }

    // 重置滑动状态
    setTouchStart(0);
    setTouchEnd(0);

    // 延迟重置滑动标志，以防止误触发点击事件
    setTimeout(() => {
      setIsSwiping(false);
    }, 50);
  };

  return (
    <div
      className="calendar-container"
      ref={calendarRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="calendar-header">
        <div className="calendar-title">
          {currentDate.year()}年{currentDate.month() + 1}月
        </div>
      </div>

      <div className="calendar-weekdays">
        {weekdays.map((weekday) => (
          <div key={weekday} className="calendar-weekday">
            {weekday}
          </div>
        ))}
      </div>

      <div className="calendar-days">
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${
              !day.isCurrentMonth ? "other-month" : ""
            } ${day.isToday ? "today" : ""} ${
              day.isHighlighted ? "highlighted" : ""
            }`}
            onClick={(e) => handleDateClick(day, e)}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
