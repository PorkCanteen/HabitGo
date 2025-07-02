import { Input, Form, DatetimePicker, Radio } from "react-vant";
import { Todo } from "../components/TodoList";
import { useHttp } from "@/hooks/useHttp";
import dayjs from "dayjs";
import { useState } from "react";
import Notify from "@/pages/components/Notify";
import { Dialog } from "@/pages/components/Dialog";
import { ResponseData } from "@/utils/http";
const defaultTodo: Todo = {
  name: "",
  description: "",
  type: 1,
  finishDate: dayjs().format("YYYY-MM-DD"), // 设置默认值为当前日期
  isFinished: 0,
};

const TodoForm = ({ 
  todo = defaultTodo, 
  close = () => {}, 
  onDelete = () => {} 
}) => {
  const isEditMode = !!todo.id;
  const [form] = Form.useForm();
  const { sendRequest } = useHttp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: Todo) => {
    if (isSubmitting) return; // 防止重复提交
    
    const params = {
      ...values,
      finishDate: dayjs(values.finishDate).format("YYYY-MM-DD"),
    };
    
    setIsSubmitting(true);
    try {
      // 创建
      if (!isEditMode) {
        const res: ResponseData | null = await sendRequest({
          url: "/todo",
          method: "POST",
          data: params,
        });

        if (res && res.code === "200") {
          Notify.show({ type: "success", message: "创建成功" });
          close();
        } else {
          Notify.show({ type: "danger", message: res?.message || "系统错误" });
        }
      } else {
        // 编辑
        const res: ResponseData | null = await sendRequest({
          url: `/todo/${todo.id}`,
          method: "PUT",
          data: params,
        });
        if (res && res.code === "200") {
          Notify.show({ type: "success", message: "修改成功" });
          close(); // 编辑完成后调用close
        } else {
          Notify.show({ type: "danger", message: res?.message || "系统错误" });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTodo = async () => {
    if (isSubmitting) return;
    
    try {
      await Dialog.confirm({
        title: "确认删除",
        message: "删除后无法恢复，是否继续？",
      });
      
      setIsSubmitting(true);
      const res: ResponseData | null = await sendRequest({
        url: `/todo/${todo.id}`,
        method: "DELETE",
      });
      
      if (res && res.code === "200") {
        Notify.show({ type: "success", message: "删除成功" });
        onDelete(); // 删除成功后调用onDelete回调
      } else {
        Notify.show({ type: "danger", message: res?.message || "删除失败" });
      }
    } catch {
      // 用户取消删除 - 不调用任何回调，保持在当前页面
      console.log("用户取消删除或删除失败");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6">
      <Form
        form={form}
        onFinish={onFinish}
        footer={
          <div
            className="w-full flex justify-center gap-4"
            style={{ margin: "16px 16px 0" }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className={`text-2xl px-16 py-4 text-white border-4 transition-opacity ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'
              }`}
              style={{
                backgroundColor: "var(--color-tertiary-pink)",
                borderColor: "var(--color-tertiary-pink)",
                borderRadius: "12px",
              }}
            >
              {isSubmitting ? "提交中..." : "确定"}
            </button>
            {isEditMode && (
              <button
                type="button"
                disabled={isSubmitting}
                className={`text-2xl px-16 py-4 text-white border-4 transition-opacity ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'
                }`}
                style={{
                  backgroundColor: "var(--color-red)",
                  borderColor: "var(--color-red)",
                  borderRadius: "12px",
                }}
                onClick={deleteTodo}
              >
                删除
              </button>
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
          <Input placeholder="请输入待办名称" maxLength={15} />
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
          rules={[{ required: true, message: "请选择待办类型" }]}
          name="type"
          label="待办类型"
        >
          <Radio.Group defaultValue={1} direction="horizontal">
            <Radio name={1} checkedColor="var(--color-tertiary-pink)">
              紧急
            </Radio>
            <Radio name={2} checkedColor="var(--color-tertiary-pink)">
              常规
            </Radio>
          </Radio.Group>
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
