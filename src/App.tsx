import { RouterProvider } from "react-router";
import router from "./router";
import { SettingO, TodoListO, SmileO } from "@react-vant/icons";
import "normalize.css";
import "./App.css";

// 图标大小
const IconSize = "1.2em";
interface tabItem {
  name: string;
  text: string; // 显示文本
  icon: any; // 图标
  path?: string; // 路由路径
  badge?: any; // 显示角标
}
const originalTabList: Array<tabItem> = [
  {
    name: "task",
    text: "习惯",
    icon: <SmileO fontSize={IconSize} />,
    path: "/task",
  },
  {
    name: "todo",
    text: "待办",
    icon: <TodoListO fontSize={IconSize} />,
    path: "/todo",
  },
  {
    name: "setting",
    text: "设置",
    icon: <SettingO fontSize={IconSize} />,
    path: "/setting",
  },
];

function App() {
  return (
    <div className="h-full w-full">
      {/* 使用RouterProvider组件将路由组件放到内容区域 再将刚刚配置的router传入router项 */}
      <div className="router-container">
          <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
