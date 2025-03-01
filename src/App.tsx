import { RouterProvider } from "react-router";
import router from "./router";
import { Tabbar } from "react-vant";
import { SettingO, TodoListO, SmileO } from "@react-vant/icons";
import { useEffect, useState } from "react";
import { map } from "lodash";

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
    text: "任务",
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
  // tab列表
  const [tabName, setTabName] = useState("task");
  const [tabList, setTabList] = useState(originalTabList);
  useEffect(() => {
    setTabList(
      map(originalTabList, (tab) => {
        if (tab.name === "task") {
          return {
            ...tab,
            badge: {
              content: 4,
            },
          };
        }
        return tab;
      })
    );
  }, []);

  return (
    <div>
      {/* 使用RouterProvider组件将路由组件放到内容区域 再将刚刚配置的router传入router项 */}
      <RouterProvider router={router} />
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
