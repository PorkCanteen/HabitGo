import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

type NotifyType = "info" | "success" | "warning" | "danger";

interface NotifyOptions {
  type?: NotifyType;
  message: string;
  duration?: number;
}

interface NotifyState extends NotifyOptions {
  visible: boolean;
  isMounted: boolean;
}

let setGlobalState: React.Dispatch<React.SetStateAction<NotifyState>> | null =
  null;

const NotifyComponent: React.FC = () => {
  const [state, setState] = useState<NotifyState>({
    visible: false,
    isMounted: false,
    message: "",
    type: "info",
    duration: 1000,
  });

  useEffect(() => {
    setGlobalState = setState;
    return () => {
      setGlobalState = null;
    };
  }, []);

  useEffect(() => {
    if (state.visible) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, visible: false }));
      }, state.duration);
      return () => clearTimeout(timer);
    }
  }, [state.visible, state.duration]);

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

  const typeStyles = {
    info: { backgroundColor: "#1989fa" },
    success: { backgroundColor: "#5ac561" },
    warning: { backgroundColor: "#ff976a" },
    danger: { backgroundColor: "#e84c34" },
  };

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
