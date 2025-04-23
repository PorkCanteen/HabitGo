import React, { CSSProperties } from "react";

interface PixelBoxProps {
  children?: React.ReactNode;
  borderColor?: string;
  borderWidth?: number;
  gapSize?: number;
  backgroundColor?: string;
  className?: string;
  style?: CSSProperties;
}

const PixelBox: React.FC<PixelBoxProps> = ({
  children,
  borderColor = "#333",
  borderWidth = 3,
  gapSize = 3,
  backgroundColor = "#fff",
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`pixel-border ${className}`}
      style={{
        position: "relative",
        width: "fit-content",
        height: "fit-content",
        backgroundColor,
        ...style,
      }}
    >
      {/* 主内容 */}
      {children}

      {/* 全边框（通过 ::before 实现） */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: `${borderWidth}px solid ${borderColor}`,
          pointerEvents: "none",
        }}
      />

      {/* 四个角的缺口 */}
      <Corner position="top-left" {...{ borderColor, borderWidth, gapSize, backgroundColor }} />
      <Corner position="top-right" {...{ borderColor, borderWidth, gapSize, backgroundColor }} />
      <Corner position="bottom-left" {...{ borderColor, borderWidth, gapSize, backgroundColor }} />
      <Corner position="bottom-right" {...{ borderColor, borderWidth, gapSize, backgroundColor }} />
    </div>
  );
};

// 辅助组件：单个缺口
const Corner: React.FC<{
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  borderColor: string;
  borderWidth: number;
  gapSize: number;
  backgroundColor: string;
}> = ({ position, gapSize, backgroundColor }) => {
  const cornerStyle: CSSProperties = {
    position: "absolute",
    width: `${gapSize}px`,
    height: `${gapSize}px`,
    backgroundColor,
    pointerEvents: "none",
  };

  switch (position) {
    case "top-left":
      cornerStyle.top = 0;
      cornerStyle.left = 0;
      break;
    case "top-right":
      cornerStyle.top = 0;
      cornerStyle.right = 0;
      break;
    case "bottom-left":
      cornerStyle.bottom = 0;
      cornerStyle.left = 0;
      break;
    case "bottom-right":
      cornerStyle.bottom = 0;
      cornerStyle.right = 0;
      break;
  }

  return <div style={cornerStyle} />;
};

export default PixelBox;