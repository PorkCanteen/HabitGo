import { useState } from "react";
import { List } from "react-vant";
import TodoItem from "../TodoItem";

// 习惯项
export interface Todo {
  id: string;
  name: string;
  description?: string;
  finishDate: string;
  isFinished?: boolean;
}
const todoListData = [
  {
    id: "1",
    name: "基本功能开发",
    description:
      "完成移动端项目基本功能的前端开发，包括列表、详情、编辑、删除等功能，以及用户登录。细节及接口交互在下个阶段开始。",
    finishDate: "2025-05-01",
    isFinished: false,
  },
  {
    id: "2",
    name: "旅游攻略",
    description:
      "完成旅游攻略，包含天气情况、出游时间、酒店预定、机票价格及时间安排、景点及兴趣点标注、注意事项、需要提前准备携带的物品清单。",
    finishDate: "2025-04-01",
    isFinished: false,
  },
  {
    id: "3",
    name: "吃大餐",
    description:
      "吃大餐吃大餐吃大餐吃大餐吃大餐吃大餐吃大餐吃大餐。",
    finishDate: "2025-03-01",
    isFinished: true,
  },
];

const TodoList = () => {
  const [finished, setFinished] = useState(false);
  // 初始待办数据
  const [todo, setTodo] = useState<Todo[]>(todoListData);

  const onListLoad = async () => {
    setFinished(true);
  };

  return (
    <div className=" p-2 h-full overflow-y-auto">
      <List onLoad={onListLoad} finished={finished}>
        {todo.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          ></TodoItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
