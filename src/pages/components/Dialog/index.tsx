import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Dialog组件的选项接口
interface DialogOptions {
  title?: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
}

// Dialog状态接口
interface DialogState extends DialogOptions {
  visible: boolean;
  isMounted: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// 全局状态管理变量
let setGlobalState: React.Dispatch<React.SetStateAction<DialogState>> | null = null;

// Dialog组件
const DialogComponent: React.FC = () => {
  // 组件状态管理
  const [state, setState] = useState<DialogState>({
    visible: false,
    isMounted: false,
    title: "提示",
    message: "",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    showCancelButton: true,
  });

  // 组件挂载时设置全局状态
  useEffect(() => {
    setGlobalState = setState;
    return () => {
      setGlobalState = null;
    };
  }, []);

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

  const handleConfirm = () => {
    setState((prev) => ({ ...prev, visible: false }));
    state.onConfirm?.();
  };

  const handleCancel = () => {
    setState((prev) => ({ ...prev, visible: false }));
    state.onCancel?.();
  };

  // 不显示时不渲染内容
  if (!state.isMounted) return null;

  // 使用ReactDOM.createPortal将对话框渲染到body
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        opacity: state.visible ? 1 : 0,
        transition: "opacity 0.3s",
        zIndex: 10000,
      }}
      onClick={handleCancel}
    >
      <div
        style={{
          width: "85%",
          maxWidth: "320px",
          backgroundColor: "white",
          border: "2px solid white",
          overflow: "hidden",
          transition: "transform 0.3s",
          transform: state.visible ? "scale(1)" : "scale(0.8)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {state.title && (
          <div
            style={{
              padding: "16px 16px 0",
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            {state.title}
          </div>
        )}
        <div
          style={{
            padding: "16px",
            fontSize: "14px",
            lineHeight: "1.4",
            textAlign: "center",
          }}
        >
          {state.message}
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #eee",
          }}
        >
          {state.showCancelButton && (
            <button
              style={{
                flex: 1,
                padding: "12px 0",
                border: "none",
                backgroundColor: "white",
                fontSize: "14px",
                cursor: "pointer",
                borderRight: "1px solid #eee",
              }}
              onClick={handleCancel}
            >
              {state.cancelButtonText}
            </button>
          )}
          <button
            style={{
              flex: 1,
              padding: "12px 0",
              border: "none",
              backgroundColor: "white",
              fontSize: "14px",
              color: "var(--color-button-primary, #1989fa)",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleConfirm}
          >
            {state.confirmButtonText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Dialog API
export const Dialog = {
  Component: DialogComponent,
  confirm: (options: DialogOptions): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (setGlobalState) {
        setGlobalState((prev) => ({
          ...prev,
          ...options,
          title: options.title || "提示",
          confirmButtonText: options.confirmButtonText || "确定",
          cancelButtonText: options.cancelButtonText || "取消",
          showCancelButton: options.showCancelButton !== false,
          visible: true,
          isMounted: true,
          onConfirm: resolve,
          onCancel: reject,
        }));
      } else {
        reject(new Error("Dialog组件未挂载"));
      }
    });
  },
  alert: (options: DialogOptions): Promise<void> => {
    return Dialog.confirm({
      ...options,
      showCancelButton: false,
    });
  },
  close: () => {
    if (setGlobalState) {
      setGlobalState((prev) => ({
        ...prev,
        visible: false,
      }));
    }
  },
};

export default Dialog; 