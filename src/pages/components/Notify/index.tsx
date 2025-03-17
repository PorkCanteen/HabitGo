import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

type NotifyType = "info" | "success" | "warning" | "danger";

// 通知选项接口
interface NotifyOptions {
  type?: NotifyType; // 通知类型，默认为'info'
  message: string; // 通知消息内容
  duration?: number; // 通知显示持续时间，单位为毫秒
}

// 通知状态接口，继承自NotifyOptions
interface NotifyState extends NotifyOptions {
  visible: boolean; // 控制通知是否可见
  isMounted: boolean; // 控制通知组件是否已挂载
}

// 全局状态管理变量
let setGlobalState: React.Dispatch<React.SetStateAction<NotifyState>> | null = null;

// 通知组件
const NotifyComponent: React.FC = () => {
  // 组件状态管理
  const [state, setState] = useState<NotifyState>({
    visible: false,
    isMounted: false,
    message: "",
    type: "info",
    duration: 1000,
  });

  // 组件挂载时设置全局状态
  useEffect(() => {
    setGlobalState = setState;
    return () => {
      setGlobalState = null;
    };
  }, []);

  // 控制通知显示时间
  useEffect(() => {
    if (state.visible) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, visible: false }));
      }, state.duration);
      return () => clearTimeout(timer);
    }
  }, [state.visible, state.duration]);

  // 控制组件挂载状态
  useEffect(() => {
    if (state.visible && !state.isMounted) {
      setState((prev) => ({ ...prev, isMounted: true }));
    }
    if (!state.visible && state.isMounted) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, isMounted: false }));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state.visible, state.isMounted]);

  // 定义通知类型对应的样式
  const typeStyles = {
    info: { backgroundColor: "#1989fa" },
    success: { backgroundColor: "#5ac561" },
    warning: { backgroundColor: "#ff976a" },
    danger: { backgroundColor: "#e84c34" },
  };

  // 使用ReactDOM.createPortal将通知渲染到body
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "8px 16px",
        fontSize: "14px",
        lineHeight: "20px",
        color: "white",
        textAlign: "center",
        transition: "transform 0.3s ease-out",
        transform: state.visible ? "translateY(0)" : "translateY(-100%)",
        zIndex: 9999,
        ...typeStyles[state.type || "info"],
      }}
      role="alert"
    >
      {state.message}
    </div>,
    document.body
  );
};

// 导出Notify对象
const Notify = {
  Component: NotifyComponent,
  show: (options: NotifyOptions) => {
    if (setGlobalState) {
      setGlobalState((prev) => ({
        ...prev,
        ...options,
        duration: options.duration || 3000,
        visible: true,
        isMounted: true,
      }));
    }
  },
};

export default Notify;
