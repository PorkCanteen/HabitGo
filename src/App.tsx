import { RouterProvider } from "react-router";
import router from "./router";
import "normalize.css";
import "./App.css";
import Notify from "./pages/components/Notify";
import { DialogProvider } from "./pages/components";

function App() {
  return (
    <div className="h-full w-full">
      <DialogProvider>
        {/* 使用RouterProvider组件将路由组件放到内容区域 再将刚刚配置的router传入router项 */}
        <div className="router-container">
          <RouterProvider router={router} />
        </div>
        <Notify.Component />
      </DialogProvider>
    </div>
  );
}

export default App;
