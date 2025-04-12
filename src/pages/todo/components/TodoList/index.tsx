import { forwardRef, useImperativeHandle, useState } from "react";
import { List } from "react-vant";
import TodoItem from "../TodoItem";
import { useHttp } from "@/hooks/useHttp";
import "@/styles/common.scss";
import Notify from "@/pages/components/Notify";

// 习惯项
export interface Todo {
  id?: number;
  name: string;
  type?: number;
  description?: string;
  finishDate: string;
  isFinished: number;
}

const TodoList = forwardRef((_props, ref) => {
  const { sendRequest } = useHttp();
  const [finished, setFinished] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState("全部"); // 新增状态管理
  const [allTodos, setAllTodos] = useState<Todo[]>([]);  // 新增状态保存所有数据

  const tabs = ["全部", "紧急", "常规"]; // 新增tab列表

  const fetchData = async () => {
    const res: any = await sendRequest({
      url: "/todo/list",
      method: "GET",
    });
    if (res.data && res.data.length) {
      setAllTodos(res.data);  // 保存所有数据
      setTodos(res.data);     // 初始化显示所有数据
    }
    setFinished(true);
  };

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  // 处理习惯点击
  const handleClick = async (id: number) => {
    const res: any = await sendRequest({
      url: `/todo/complete/${id}`,
      method: "PUT",
    });
    if (res && res.code === "200") {
      Notify.show({ type: "success", message: '操作成功' });
    } else {
      Notify.show({ type: "danger", message: res?.message || "系统错误" });
    }
    fetchData();
  };

  const onListLoad = async () => {
    await fetchData();
  };

  const tabFilters = {
    "全部": (todos: Todo[]) => todos,
    "紧急": (todos: Todo[]) => todos.filter(todo => todo.type === 1),
    "常规": (todos: Todo[]) => todos.filter(todo => todo.type === 2),
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const filter = tabFilters[tab as keyof typeof tabFilters];
    setTodos(filter(allTodos));
  };
  return (
    <div className="list-container">
      <div className="flex pl-2 mt-2">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-card ${activeTab === tab ? "checked" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="list px-2 pb-2 overflow-y-auto">
        <List onLoad={onListLoad} finished={finished}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              todoClick={() => todo.id !== undefined && handleClick(todo.id)}
              updateList={fetchData}
            ></TodoItem>
          ))}
        </List>
      </div>
    </div>
  );
});

export default TodoList;
