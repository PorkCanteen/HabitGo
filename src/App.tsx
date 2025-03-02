import { RouterProvider } from "react-router";
import router from "./router";
import { Tabbar } from "react-vant";
import { SettingO, TodoListO, SmileO } from "@react-vant/icons";
import { useEffect, useState } from "react";
import { map } from "lodash";
import "normalize.css";
import "./App.css";
import CountContext from "./CountContext";

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
    text: "待办",
    icon: <TodoListO fontSize={IconSize} />,
    path: "/task",
  },
  {
    name: "todo",
    text: "计划",
    icon: <SmileO fontSize={IconSize} />,
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
  // 待办任务列表-未完成个数
  const [taskCount, setTaskCount] = useState(0);
  // tab列表
  const [tabName, setTabName] = useState("task");
  const [tabList, setTabList] = useState(originalTabList);
  // 监听任务数量变化-更新tab列表
  useEffect(() => {
    setTabList(
      map(originalTabList, (tab) => {
        if (tab.name === "task") {
          return {
            ...tab,
            badge: {
              content: taskCount || null,
            },
          };
        }
        return tab;
      })
    );
  }, [taskCount]);

  return (
    <div className="h-full w-full">
      {/* 使用RouterProvider组件将路由组件放到内容区域 再将刚刚配置的router传入router项 */}
      <div className="router-container">
        <CountContext.Provider value={{ taskCount: taskCount, setTaskCount }}>
          <RouterProvider router={router} />
        </CountContext.Provider>
      </div>
      {/* 底部菜单栏 */}
      <Tabbar value={tabName} onChange={(name) => setTabName(name as string)}>
        {map(tabList, (tab) => {
          return (
            <Tabbar.Item
              key={tab.name}
              name={tab.name}
              icon={tab.icon}
              badge={tab.badge}
            >
              {tab.text}
            </Tabbar.Item>
          );
        })}
      </Tabbar>
    </div>
  );
}

export default App;
