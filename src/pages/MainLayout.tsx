import { Outlet } from "react-router-dom";
import TabGroup from "./TabGroup";

const MainLayout = () => {
  return (
    <div className="h-full w-full flex flex-col">
      {/* 主要内容区域 */}
      <Outlet />
      {/* 底部导航栏 */}
      <TabGroup />
    </div>
  );
};

export default MainLayout;
