import { forwardRef, useImperativeHandle, useState } from "react";
import { List } from "react-vant";
import TodoItem from "../TodoItem";
import { useHttp } from "@/hooks/useHttp";

// 习惯项
export interface Todo {
  id?: number;
  name: string;
  type?: number;
  description?: string;
  finishDate: string;
  isFinished: number;
}

const TodoList = forwardRef((props, ref) => {
  const { sendRequest } = useHttp();
  const [finished, setFinished] = useState(false);
  // 初始待办数据
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const fetchData = async () => {
    const res: any = await sendRequest({
      url: "/todo/list",
      method: "GET",
    });
    if (res.data && res.data.length) {
      setTodos(res.data);
    }
    setFinished(true);
  };

  useImperativeHandle(ref, () => ({
    fetchData
  }));

  // 处理习惯点击
  const handleClick = (id: number) => {
    setTodos(
      todos
        .map((todo) => {
          if (todo.id === id) {
            const finished = todo.isFinished ? 0 : 1;
            return { ...todo, isFinished: finished };
          }
          return todo;
        })
        .sort((a, b) => a.isFinished - b.isFinished)
    );
  };

  const onListLoad = async () => {
    await fetchData()
  };

  return (
    <div className=" p-2 h-full overflow-y-auto">
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
  );
});

export default TodoList;
