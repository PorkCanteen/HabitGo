import { Tabbar } from "react-vant";
import { map } from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TabGroup.css";  // 添加这行

// 图标大小
const IconSize = 24;
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
    icon: (
      <svg
        className="icon"
        aria-hidden="true"
        width={IconSize}
        height={IconSize}
      >
        <use xlinkHref="#icon--star"></use>
      </svg>
    ),
    path: "/task",
  },
  {
    name: "todo",
    text: "待办",
    icon: (
      <svg
        className="icon"
        aria-hidden="true"
        width={IconSize}
        height={IconSize}
      >
        <use xlinkHref="#icon--calendar"></use>
      </svg>
    ),
    path: "/todo",
  },
  {
    name: "setting",
    text: "设置",
    icon: (
      <svg
        className="icon"
        aria-hidden="true"
        width={IconSize}
        height={IconSize}
      >
        <use xlinkHref="#icon--settings"></use>
      </svg>
    ),
    path: "/setting",
  },
];

const TabGroup = () => {
  // tab列表
  const [tabName, setTabName] = useState("task");
  const [tabList, setTabList] = useState(originalTabList);
  const navigate = useNavigate();
  const location = useLocation();
  const onTabChange = (name: string) => {
    setTabName(name as string);
    navigate(`/${name}`);
  };
  // 监听习惯数量变化-更新tab列表
  useEffect(() => {
    const tabName = location.pathname.split("/")[1];
    setTabName(tabName);
    setTabList(originalTabList);
  }, []);
  return (
    <Tabbar value={tabName} activeColor="#f26d2c" onChange={(name: string | number) => onTabChange(name.toString())}>
      {map(tabList, (tab) => {
        return (
          <Tabbar.Item
            key={tab.name}
            name={tab.name}
            icon={tab.icon}
            badge={tab.badge}
            className={tab.name === tabName ? "active-tab" : ""}
          >
            {tab.text}
          </Tabbar.Item>
        );
      })}
    </Tabbar>
  );
};

export default TabGroup;
