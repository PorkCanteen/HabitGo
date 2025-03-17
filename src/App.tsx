import { RouterProvider } from "react-router";
import router from "./router";
import "normalize.css";
import "./App.css";
import Notify from "./pages/components/Notify";
function App() {
  return (
    <div className="h-full w-full">
      {/* 使用RouterProvider组件将路由组件放到内容区域 再将刚刚配置的router传入router项 */}
      <div className="router-container">
        <RouterProvider router={router} />
      </div>
      <Notify.Component />
    </div>
  );
}

export default App;
