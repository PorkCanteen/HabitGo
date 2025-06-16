import { useState, useEffect } from "react";
import "./index.scss";
import { PixelBox } from "@/pages/components";
import { useNavigate, useParams } from "react-router-dom";
import { useHttp } from "@/hooks/useHttp";
import { Popup } from "react-vant";
import TodoForm from "../../form/TodoForm";
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

// 定义待办详情数据类型 - 更新以匹配实际API返回结构
interface TodoDetailData {
  id: number;
  userId: number;
  name: string; // API返回的是name，不是title
  description: string;
  finishDate: string; // 新增字段
  isFinished: number; // API返回的是isFinished，不是isCompleted
  type: number; // 新增字段
  createTime: string;
  updateTime: string;
  children: SubTodoItem[]; // API返回的是children，不是subTodos
}

// 定义API响应包装类型（预留给后续API调用使用）
interface ApiResponse<T> {
  code: string;
  message: string | null;
  data: T;
}

const borderWidth = 16;

const TodoDetail = () => {
  const [todoDetail, setTodoDetail] = useState<TodoDetailData | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isEditingSubTodos, setIsEditingSubTodos] = useState(false);
  const [editingSubTodos, setEditingSubTodos] = useState<SubTodoItem[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchTodoDetail = async () => {
      if (!id) return;
      
      // API调用逻辑
      const res = await sendRequest<ApiResponse<TodoDetailData>>({
        url: `/todo/${id}`,
        method: "GET",
      });
      if (res && res.code === "200" && res.data) {
        setTodoDetail(res.data);
      }
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
    setShowEditForm(true);
  };

  const onFormClose = () => {
    setShowEditForm(false);
    // 重新查询数据逻辑预留
    // 返回列表页，使用退出动画
    setIsExiting(true);
    setTimeout(() => {
      navigate("/todo");
    }, 300);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleEditSubTodos = () => {
    if (isEditingSubTodos) {
      // 完成编辑 - 校验并保存
      handleSaveSubTodos();
    } else {
      // 进入编辑模式
      setIsEditingSubTodos(true);
      setEditingSubTodos([...(todoDetail?.children || [])]);
    }
  };

  const handleSaveSubTodos = async () => {
    // 校验是否有空的子任务
    const hasEmptyTask = editingSubTodos.some(task => task.content.trim() === '');
    if (hasEmptyTask) {
      Notify.show({
        type: 'danger',
        message: '请完善所有待办项内容或删除空项'
      });
      return;
    }

    try {
      // 保存子待办项到服务器
      const childrenData = editingSubTodos.map(task => ({
        id: task.id,
        content: task.content,
        isCompleted: task.isCompleted
      }));

      const res = await sendRequest<ApiResponse<any>>({
        url: `/todo/${id}/children`,
        method: "PUT",
        data: childrenData
      });

      console.log('保存子待办项结果:', res);
      
      if (res && res.code === "200") {
        // 保存成功，更新本地数据并退出编辑模式
        if (todoDetail) {
          setTodoDetail({
            ...todoDetail,
            children: editingSubTodos
          });
        }
        setIsEditingSubTodos(false);
        setEditingSubTodos([]);
        
        Notify.show({
          type: 'success',
          message: '保存成功'
        });
      } else {
        Notify.show({
          type: 'danger',
          message: res?.message || '保存失败'
        });
      }
    } catch (error) {
      console.error('保存子待办项失败:', error);
      Notify.show({
        type: 'danger',
        message: '保存失败，请重试'
      });
    }
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
    // 计算当前最大ID
    const maxId = editingSubTodos.length > 0 
      ? Math.max(...editingSubTodos.map(item => item.id))
      : 0;
    
    const newSubTodo: SubTodoItem = {
      id: maxId + 1, // 使用最大ID+1
      todoId: Number(id),
      content: '',
      isCompleted: 0,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    };
    setEditingSubTodos([...editingSubTodos, newSubTodo]);
  };

  const handleSubTodoToggle = async (subTodoId: number) => {
    try {
      // 调用切换状态接口
      const res = await sendRequest<ApiResponse<any>>({
        url: `/todo/${id}/children/${subTodoId}/toggle`,
        method: "PUT"
      });

      console.log('切换子待办状态结果:', res);
      
      if (res && res.code === "200") {
        // 切换成功，更新本地状态
        if (todoDetail) {
          const updatedSubTodos = todoDetail.children.map(item => 
            item.id === subTodoId 
              ? { ...item, isCompleted: item.isCompleted === 1 ? 0 : 1 }
              : item
          );
          setTodoDetail({
            ...todoDetail,
            children: updatedSubTodos
          });
        }
        
        Notify.show({
          type: 'success',
          message: '状态更新成功'
        });
      } else {
        Notify.show({
          type: 'danger',
          message: res?.message || '状态更新失败'
        });
      }
    } catch (error) {
      console.error('切换子待办状态失败:', error);
      Notify.show({
        type: 'danger',
        message: '状态更新失败，请重试'
      });
    }
  };

  // 计算完成统计
  const getCompletionStats = () => {
    if (!todoDetail) return { completed: 0, total: 0 };
    
    const completed = todoDetail.children.filter(item => item.isCompleted === 1).length;
    const total = todoDetail.children.length;
    
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
        <div className="title">{todoDetail?.name || "加载中..."}</div>
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

        {/* 待办项列表 */}
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
                  {editingSubTodos.length > 0 ? (
                    editingSubTodos.map((subTodo, index) => (
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
                    ))
                  ) : (
                    <div className="empty-edit-state">
                      <div className="empty-edit-text">暂无待办项</div>
                      <div className="empty-edit-tip">点击下方按钮添加第一个待办项</div>
                    </div>
                  )}
                  
                  <div className="add-subtodo-btn" onClick={handleAddSubTodo}>
                    <i className="iconfont icon-x_jiaru"></i>
                    <span>添加待办项</span>
                  </div>
                </>
              ) : (
                // 查看模式
                <>
                  {todoDetail?.children.map((subTodo) => (
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
                  
                  {(!todoDetail?.children || todoDetail.children.length === 0) && (
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
      
      {/* 编辑表单弹框 */}
      <Popup
        visible={showEditForm}
        overlay={true}
        round={true}
        closeOnClickOverlay={true}
        closeable={true}
        title="编辑待办"
        style={{ width: "85%", height: "100%" }}
        position="right"
        onClose={() => setShowEditForm(false)}
      >
        {todoDetail && (
          <TodoForm 
            todo={{
              id: todoDetail.id,
              name: todoDetail.name,
              description: todoDetail.description,
              finishDate: todoDetail.finishDate,
              isFinished: todoDetail.isFinished,
              type: todoDetail.type,
              createTime: todoDetail.createTime,
              updateTime: todoDetail.updateTime
            }} 
            close={onFormClose} 
          />
        )}
      </Popup>
    </div>
  );
};

export default TodoDetail; 