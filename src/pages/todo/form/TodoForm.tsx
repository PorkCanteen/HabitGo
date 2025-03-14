import { Button, Input, Form, DatetimePicker } from "react-vant";
import { Todo } from "../components/TodoList";
import { useHttp } from "@/hooks/useHttp";
const defaultTask: Todo = {
  id: "",
  name: "",
  description: "",
  finishDate: "",
  isFinished: 0,
};

const TodoForm = ({ task = defaultTask, close = () => {} }) => {
  const isEditMode = !!task.id;
  const [form] = Form.useForm();
  const { sendRequest } = useHttp();

  const onFinish = async (values: unknown) => {
    // 创建
    if (!isEditMode) {
      await sendRequest({
        url: "/task",
        method: "POST",
        data: values,
      });
      close();
    } else {
      // 编辑
      await sendRequest({
        url: `/task/${task.id}`,
        method: "PUT",
        data: values,
      });
      close();
    }
  };
  const deleteTask = async () => {
    await sendRequest({
      url: `/task/${task.id}`,
      method: "DELETE",
    });
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
                onClick={deleteTask}
              >
                删除
              </Button>
            )}
          </div>
        }
        initialValues={task}
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
