import { SettingO, SmileO, TodoListO } from "@react-vant/icons";
import { Tabbar } from "react-vant";
import { map } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const TabGroup = () => {
  // tab列表
  const [tabName, setTabName] = useState("task");
  const [tabList, setTabList] = useState(originalTabList);
  const navigate = useNavigate();
  const onTabChange = (name: string) => {
    setTabName(name as string)
    navigate(`/${name}`)
  }
  // 监听习惯数量变化-更新tab列表
  useEffect(() => {
    setTabList(originalTabList);
  }, []);
  return (
    <Tabbar
      value={tabName}
      activeColor="#f26d2c"
      onChange={onTabChange}
    >
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
  );
};

export default TabGroup;
