import { useState } from "react";
import { List } from "react-vant";
import TodoItem from "../TodoItem";

// 习惯项
export interface Todo {
  id: string;
  name: string;
  description?: string;
  finishDate: string;
  isFinished?: number;
}
const todoListData = [
  {
    id: "1",
    name: "基本功能开发",
    description:
      "完成移动端项目基本功能的前端开发，包括列表、详情、编辑、删除等功能，以及用户登录。细节及接口交互在下个阶段开始。",
    finishDate: "2025-05-01",
    isFinished: 0,
  },
  {
    id: "2",
    name: "旅游攻略",
    description:
      "完成旅游攻略，包含天气情况、出游时间、酒店预定、机票价格及时间安排、景点及兴趣点标注、注意事项、需要提前准备携带的物品清单。",
    finishDate: "2025-04-01",
    isFinished: 0,
  },
  {
    id: "3",
    name: "吃大餐",
    description: "吃大餐吃大餐吃大餐吃大餐吃大餐吃大餐吃大餐吃大餐。",
    finishDate: "2025-03-01",
    isFinished: 1,
  },
];

const TodoList = () => {
  const [finished, setFinished] = useState(false);
  // 初始待办数据
  const [todos, setTodos] = useState<Todo[]>(todoListData);
  const onListLoad = async () => {
    setFinished(true);
  };

  // 处理习惯点击
  const handleClick = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const finished = todo.isFinished ? 0 : 1;
          return { ...todo, isFinished: finished };
        }
        return todo;
      })
    );
  };

  return (
    <div className=" p-2 h-full overflow-y-auto">
      <List onLoad={onListLoad} finished={finished}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todoClick={() => todo.id !== undefined && handleClick(todo.id)}
          ></TodoItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
