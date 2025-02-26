import { RouterProvider } from "react-router";
import router from "./router";
import React from "react";

function App() {
  return (
    // 使用RouterProvider组件将路由组件放到内容区域 再将刚刚配置的router传入router项
    <RouterProvider router={router} />
  );
}

export default App;
