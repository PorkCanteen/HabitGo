import { forwardRef, useImperativeHandle, useState } from "react";
import { List } from "react-vant";
import TodoItem from "../TodoItem";
import { useHttp } from "@/hooks/useHttp";
import Notify from "@/pages/components/Notify";
import PixelBox from "@/pages/components/PixelBox";

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
  const [activeTab, setActiveTab] = useState("全部");
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [animatingTab, setAnimatingTab] = useState<string | null>(null);

  const tabs = ["全部", "待完成", "已完成"];

  const fetchData = async () => {
    const res: any = await sendRequest({
      url: "/todo/list",
      method: "GET",
    });
    if (res.data) {
      setAllTodos(res.data); // 保存所有数据
      setTodos(res.data); // 初始化显示所有数据
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
      Notify.show({ type: "success", message: "操作成功" });
    } else {
      Notify.show({ type: "danger", message: res?.message || "系统错误" });
    }
    fetchData();
  };

  const onListLoad = async () => {
    await fetchData();
  };

  const tabFilters = {
    全部: (todos: Todo[]) => todos,
    待完成: (todos: Todo[]) => todos.filter((todo) => !todo.isFinished),
    已完成: (todos: Todo[]) => todos.filter((todo) => todo.isFinished),
  };

  const handleTabClick = (tab: string) => {
    setAnimatingTab(tab);
    setTimeout(() => {
      setAnimatingTab(null);
      setActiveTab(tab);
      const filter = tabFilters[tab as keyof typeof tabFilters];
      setTodos(filter(allTodos));
    }, 200);
  };

  return (
    <div className="list-container">
      <div className="flex pl-2 my-2">
        {tabs.map((tab) => (
          <PixelBox
            key={tab}
            className={`mr-2 ${
              animatingTab === tab ? "click-shrink-animate" : ""
            }`}
            borderColor={
              activeTab === tab
                ? "var(--color-button-primary)"
                : "var(--color-button-secondary)"
            }
          >
            <div
              className={`tab-card text-2xl px-3 py-1 ${
                activeTab === tab ? "checked" : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          </PixelBox>
        ))}
      </div>
      <div className="list px-2 pb-2 overflow-y-auto">
        <List onLoad={onListLoad} finished={finished}>
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div
                className="text-3xl mb-4"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                请创建您的第一个待办吧！
              </div>
              <svg aria-hidden="true" width={40} height={40}>
                <use xlinkHref="#icon--happy"></use>
              </svg>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                todoClick={() => todo.id !== undefined && handleClick(todo.id)}
                updateList={fetchData}
              ></TodoItem>
            ))
          )}
        </List>
      </div>
    </div>
  );
});

export default TodoList;
