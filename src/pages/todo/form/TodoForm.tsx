import { Button, Input, Form, DatetimePicker } from "react-vant";
import { Todo } from "../components/TodoList";
import { useHttp } from "@/hooks/useHttp";
import dayjs from "dayjs";
import { Notify } from "@/pages/components/Notify";
const defaultTodo: Todo = {
  name: "",
  description: "",
  finishDate: "",
  isFinished: 0,
};

const TodoForm = ({ todo = defaultTodo, close = () => {} }) => {
  const isEditMode = !!todo.id;
  const [form] = Form.useForm();
  const { sendRequest } = useHttp();

  const onFinish = async (values: Todo) => {
    const params = {
      ...values,
      finishDate: dayjs(values.finishDate).format("YYYY-MM-DD"),
    }
    // 创建
    if (!isEditMode) {
      await sendRequest({
        url: "/todo",
        method: "POST",
        data: params,
      });
      Notify.show({ type: 'success', message: '创建成功' });
      close();
    } else {
      // 编辑
      await sendRequest({
        url: `/todo/${todo.id}`,
        method: "PUT",
        data: params,
      });
      Notify.show({ type: 'success', message: '修改成功' });
      close();
    }
  };
  const deleteTodo = async () => {
    await sendRequest({
      url: `/todo/${todo.id}`,
      method: "DELETE",
    });
    Notify.show({ type: 'success', message: '删除成功' });
    close();
  };
  return (
    <div className="px-6">
      <Form
        form={form}
        onFinish={onFinish}
        footer={
          <div style={{ margin: "16px 16px 0" }}>
            <Button round nativeType="submit" color="#f19c34" block>
              确定
            </Button>
            {isEditMode && (
              <Button
                className="mt-3"
                round
                color="#e15241"
                block
                onClick={deleteTodo}
              >
                删除
              </Button>
            )}
          </div>
        }
        initialValues={todo}
      >
        <Form.Item
          tooltip={{
            message: "请确保待办名称唯一",
          }}
          rules={[{ required: true, message: "请填写待办名称" }]}
          name="name"
          label="待办名称"
        >
          <Input placeholder="请输入待办名称" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "请填写待办详情" }]}
          name="description"
          label="待办详情"
        >
          <Input.TextArea
            placeholder="请输入待办详情"
            autoSize={{ minHeight: 120 }}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "请选择完成时间" }]}
          name="finishDate"
          label="完成时间"
        >
          <DatetimePicker
            title=""
            type="date"
            showToolbar={false}
            className="w-full"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TodoForm;
