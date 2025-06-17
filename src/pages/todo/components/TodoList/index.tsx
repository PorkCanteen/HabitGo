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
  finishDate: string | Date;
  isFinished: number;
  updateTime?: string; // 添加更新时间字段
  createTime?: string; // 添加创建时间字段
}

// API响应类型
interface ApiResponse {
  data: Todo[];
  code: string;
  message?: string;
}

// 排序类型
type SortType = 'updateTime' | 'finishDate';

const TodoList = forwardRef((_props, ref) => {
  const { sendRequest } = useHttp();
  const [finished, setFinished] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState("全部");
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [animatingTab, setAnimatingTab] = useState<string | null>(null);
  // 排序状态管理
  const [sortType, setSortType] = useState<SortType>('updateTime');
  const [animatingSortType, setAnimatingSortType] = useState<boolean>(false);

  const tabs = ["全部", "待完成", "已完成"];

  // 排序类型对应的显示文本
  const sortTypeText: Record<SortType, string> = {
    'updateTime': '更新时间',
    'finishDate': '完成时间',
  };

  const fetchData = async () => {
    const res = await sendRequest<ApiResponse>({
      url: "/todo/list",
      method: "GET",
    });
    if (res && res.data) {
      setAllTodos(res.data); // 保存所有数据
      // 应用排序和过滤
      const filteredTodos = applySortAndFilter(res.data, sortType, activeTab);
      setTodos(filteredTodos);
    }
    setFinished(true);
  };

  // 应用排序和过滤
  const applySortAndFilter = (
    data: Todo[],
    currentSortType: SortType,
    currentTab: string
  ): Todo[] => {
    // 先应用过滤
    const filteredData = tabFilters[currentTab as keyof typeof tabFilters](data);
    
    // 再应用排序
    return sortData(filteredData, currentSortType);
  };

  // 排序数据
  const sortData = (data: Todo[], currentSortType: SortType): Todo[] => {
    return [...data].sort((a, b) => {
      // 首先按是否完成排序：未完成的排在前面
      if (a.isFinished !== b.isFinished) {
        return a.isFinished - b.isFinished;
      }
      
      // 然后按选定的排序类型排序
      if (currentSortType === 'updateTime') {
        // 按更新时间降序
        return (b.updateTime || '').localeCompare(a.updateTime || '');
      } else if (currentSortType === 'finishDate') {
        // 按完成时间降序
        return (b.finishDate || '').localeCompare(a.finishDate || '');
      }
      return 0;
    });
  };

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  // 处理待办点击
  const handleClick = async (id: number) => {
    try {
      const res = await sendRequest<ApiResponse>({
        url: `/todo/complete/${id}`,
        method: "PUT",
      });
      if (res && res.code === "200") {
        Notify.show({ type: "success", message: "操作成功" });
      } else {
        Notify.show({ type: "danger", message: res?.message || "系统错误" });
      }
    } catch {
      Notify.show({ type: "danger", message: "系统错误，请稍后再试" });
    } finally {
      fetchData();
    }
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
      // 应用排序和过滤
      const sortedAndFilteredTodos = applySortAndFilter(allTodos, sortType, tab);
      setTodos(sortedAndFilteredTodos);
    }, 200);
  };

  // 处理排序点击
  const handleSortClick = () => {
    setAnimatingSortType(true);
    setTimeout(() => {
      setAnimatingSortType(false);
      // 切换下一个排序方式
      const nextSortType = getNextSortType(sortType);
      setSortType(nextSortType);
      // 应用新的排序
      const sortedAndFilteredTodos = applySortAndFilter(allTodos, nextSortType, activeTab);
      setTodos(sortedAndFilteredTodos);
    }, 200);
  };

  // 获取下一个排序类型
  const getNextSortType = (current: SortType): SortType => {
    const sortTypes: SortType[] = ['updateTime', 'finishDate'];
    const currentIndex = sortTypes.indexOf(current);
    return sortTypes[(currentIndex + 1) % sortTypes.length];
  };

  return (
    <div className="list-container">
      <div className="flex pl-2 my-2 justify-between">
        <div className="flex">
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
        <div 
          style={{ color: "var(--color-text-secondary)" }}
          onClick={handleSortClick}
          className={`flex items-center cursor-pointer pr-2 ${animatingSortType ? "click-shrink-animate" : ""}`}
        >
          {sortTypeText[sortType]}
          <i className="iconfont icon-x_paixu ml-2 text-xl"></i>
        </div>
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
