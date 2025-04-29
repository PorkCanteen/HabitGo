import { Outlet, useLocation } from "react-router-dom";
import TabGroup from "./TabGroup";

const MainLayout = () => {
  const location = useLocation();
  
  // 需要隐藏底部导航栏的路由路径
  const hideTabRoutes = [
    '/task/detail',
    '/todo/detail',
    // 可以在此处添加更多需要隐藏导航栏的路由
  ];
  
  const hideTabGroup = hideTabRoutes.some(route => location.pathname.includes(route));

  return (
    <div className="h-full w-full flex flex-col">
      {/* 主要内容区域 */}
      <Outlet />
      {/* 底部导航栏 */}
      {!hideTabGroup && <TabGroup />}
    </div>
  );
};

export default MainLayout;
