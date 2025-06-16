import { useState, useEffect } from "react";
import "./index.scss";
import { PixelBox } from "@/pages/components";
import { useNavigate, useParams } from "react-router-dom";
import { useHttp } from "@/hooks/useHttp";
import Notify from "@/pages/components/Notify";

// 定义子待办数据类型
interface SubTodoItem {
  id: number;
  todoId: number;
  content: string;
  isCompleted: number; // 0: 未完成, 1: 已完成
  createTime: string;
  updateTime: string;
}

// 定义待办详情数据类型
interface TodoDetailData {
  id: number;
  userId: number;
  title: string;
  description: string;
  isCompleted: number;
  createTime: string;
  updateTime: string;
  subTodos: SubTodoItem[];
}

// 定义API响应包装类型（预留给后续API调用使用）
// interface ApiResponse<T> {
//   code: string;
//   message: string | null;
//   data: T;
// }

const borderWidth = 16;

const TodoDetail = () => {
  const [todoDetail, setTodoDetail] = useState<TodoDetailData | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isEditingSubTodos, setIsEditingSubTodos] = useState(false);
  const [editingSubTodos, setEditingSubTodos] = useState<SubTodoItem[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchTodoDetail = async () => {
      if (!id) return;
      
      // 这里是预留的API调用逻辑
      // const res = await sendRequest<ApiResponse<TodoDetailData>>({
      //   url: `/todo/${id}`,
      //   method: "GET",
      // });
      // console.log('待办详情接口返回值:', res);
      // if (res && res.code === "200" && res.data) {
      //   setTodoDetail(res.data);
      // }

      // 模拟数据
      const mockData: TodoDetailData = {
        id: Number(id),
        userId: 1,
        title: "学习前端开发",
        description: "1. 系统性学习前端开发技术栈\n2. 学习React基础\n3. 学习TypeScript\n4. 学习状态管理\n5. 学习CSS预处理器",
        isCompleted: 0,
        createTime: "2024-01-01 10:00:00",
        updateTime: "2024-01-15 14:30:00",
        subTodos: [
          {
            id: 1,
            todoId: Number(id),
            content: "学习React基础",
            isCompleted: 1,
            createTime: "2024-01-01 10:00:00",
            updateTime: "2024-01-05 16:00:00"
          },
          {
            id: 2,
            todoId: Number(id),
            content: "学习TypeScript",
            isCompleted: 1,
            createTime: "2024-01-05 10:00:00",
            updateTime: "2024-01-10 18:00:00"
          },
          {
            id: 3,
            todoId: Number(id),
            content: "学习CSS预处理器",
            isCompleted: 0,
            createTime: "2024-01-10 10:00:00",
            updateTime: "2024-01-10 10:00:00"
          },
          {
            id: 4,
            todoId: Number(id),
            content: "学习状态管理",
            isCompleted: 0,
            createTime: "2024-01-12 10:00:00",
            updateTime: "2024-01-12 10:00:00"
          }
        ]
      };
      setTodoDetail(mockData);
    };
    
    fetchTodoDetail();
  }, [sendRequest, id]);

  const goBack = () => {
    setIsExiting(true);
    // 延迟导航，等待退出动画完成
    setTimeout(() => {
      navigate("/todo");
    }, 300); // 动画时长300ms
  };

  const handleEdit = () => {
    // 编辑逻辑预留
    console.log('编辑待办事项');
  };

  const handleEditSubTodos = () => {
    if (isEditingSubTodos) {
      // 完成编辑 - 校验并保存
      handleSaveSubTodos();
    } else {
      // 进入编辑模式
      setIsEditingSubTodos(true);
      setEditingSubTodos([...(todoDetail?.subTodos || [])]);
    }
  };

  const handleSaveSubTodos = () => {
    // 校验是否有空的子任务
    const hasEmptyTask = editingSubTodos.some(task => task.content.trim() === '');
    if (hasEmptyTask) {
              Notify.show({
          type: 'danger',
          message: '请完善所有待办项内容或删除空项'
        });
      return;
    }

    // 保存逻辑预留
    console.log('保存待办项:', editingSubTodos);
    
    // 更新原数据并退出编辑模式
    if (todoDetail) {
      setTodoDetail({
        ...todoDetail,
        subTodos: editingSubTodos
      });
    }
    setIsEditingSubTodos(false);
    setEditingSubTodos([]);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleSubTodoContentChange = (index: number, content: string) => {
    const updatedTodos = [...editingSubTodos];
    updatedTodos[index] = { ...updatedTodos[index], content };
    setEditingSubTodos(updatedTodos);
  };

  const handleDeleteSubTodo = (index: number) => {
    const updatedTodos = editingSubTodos.filter((_, i) => i !== index);
    setEditingSubTodos(updatedTodos);
  };

  const handleAddSubTodo = () => {
    const newSubTodo: SubTodoItem = {
      id: Date.now(), // 临时ID
      todoId: Number(id),
      content: '',
      isCompleted: 0,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    };
    setEditingSubTodos([...editingSubTodos, newSubTodo]);
  };

  const handleSubTodoToggle = (subTodoId: number) => {
    // 切换子待办完成状态逻辑预留
    console.log('切换子待办完成状态:', subTodoId);
    
    // 更新本地状态
    if (todoDetail) {
      const updatedSubTodos = todoDetail.subTodos.map(item => 
        item.id === subTodoId 
          ? { ...item, isCompleted: item.isCompleted === 1 ? 0 : 1 }
          : item
      );
      setTodoDetail({
        ...todoDetail,
        subTodos: updatedSubTodos
      });
    }
  };

  // 计算完成统计
  const getCompletionStats = () => {
    if (!todoDetail) return { completed: 0, total: 0 };
    
    const completed = todoDetail.subTodos.filter(item => item.isCompleted === 1).length;
    const total = todoDetail.subTodos.length;
    
    return { completed, total };
  };

  const stats = getCompletionStats();

  return (
    <div className={`todo-detail-container ${isExiting ? 'exiting' : ''}`}>
      {/* 标题 */}
      <div className="header-container">
        <div className="back-btn" onClick={goBack}>
          <i className="iconfont icon-arrow-pixel-copy"></i>
        </div>
        <div className="title">{todoDetail?.title || "加载中..."}</div>
        {todoDetail?.description && (
          <div className="description-wrapper">
            {isDescriptionExpanded && (
              <div className="description">
                {todoDetail.description}
              </div>
            )}
            <div className="expand-btn" onClick={toggleDescription}>
              <i className={`iconfont ${isDescriptionExpanded ? 'icon-top' : 'icon-bottom'}`}></i>
            </div>
          </div>
        )}
        <div className="edit-btn" onClick={handleEdit}>
          <i className="iconfont icon-x_peizhi"></i>
        </div>
      </div>
      
      {/* 可滚动的内容区域 */}
      <div className="content-scroll-area">
        {/* 完成进度 */}
        <div className="progress-container">
          <PixelBox
            className="w-full"
            borderColor="var(--color-background-primary)"
            borderWidth={borderWidth}
            gapSize={borderWidth}
            backgroundColor="var(--color-primary)"
          >
            <div className="section-container">完成进度</div>
            <div className="progress-content">
              <div className="progress-text">
                {stats.completed} / {stats.total} 已完成
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </PixelBox>
        </div>

        {/* 子待办列表 */}
        <div className="subtodos-container">
          <PixelBox
            className="w-full"
            borderColor="var(--color-background-primary)"
            borderWidth={borderWidth}
            gapSize={borderWidth}
            backgroundColor="var(--color-primary)"
          >
            <div className="section-container">
              待办项
              <button className="edit-subtodos-btn" onClick={handleEditSubTodos}>
                <i className={`iconfont ${isEditingSubTodos ? 'icon-check' : 'icon-x_peizhi'}`}></i>
                {isEditingSubTodos ? '完成' : '管理'}
              </button>
            </div>
            <div className="subtodos-list">
              {isEditingSubTodos ? (
                // 编辑模式
                <>
                  {editingSubTodos.map((subTodo, index) => (
                    <div key={subTodo.id} className="subtodo-item editing">
                      <input
                        type="text"
                        className="subtodo-input"
                        value={subTodo.content}
                        onChange={(e) => handleSubTodoContentChange(index, e.target.value)}
                        placeholder="请输入待办项内容"
                      />
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteSubTodo(index)}
                      >
                        <i className="iconfont icon-x_lajitong"></i>
                      </button>
                    </div>
                  ))}
                  
                  <div className="add-subtodo-btn" onClick={handleAddSubTodo}>
                    <i className="iconfont icon-x_jiaru"></i>
                    <span>添加待办项</span>
                  </div>
                </>
              ) : (
                // 查看模式
                <>
                  {todoDetail?.subTodos.map((subTodo) => (
                    <div key={subTodo.id} className="subtodo-item">
                      <div 
                        className={`checkbox ${subTodo.isCompleted === 1 ? 'checked' : ''}`}
                        onClick={() => handleSubTodoToggle(subTodo.id)}
                      >
                        {subTodo.isCompleted === 1 && (
                          <i className="iconfont icon-duihao-copy"></i>
                        )}
                      </div>
                      <div className={`subtodo-content ${subTodo.isCompleted === 1 ? 'completed' : ''}`}>
                        {subTodo.content}
                      </div>
                    </div>
                  ))}
                  
                  {(!todoDetail?.subTodos || todoDetail.subTodos.length === 0) && (
                    <div className="empty-state">
                      <div className="empty-text">暂无待办项</div>
                      <div className="empty-tip">点击右上角管理按钮添加待办项</div>
                    </div>
                  )}
                </>
              )}
            </div>
          </PixelBox>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail; 