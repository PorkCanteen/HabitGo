import { Input, Form, DatetimePicker, Radio } from "react-vant";
import { Todo } from "../components/TodoList";
import { useHttp } from "@/hooks/useHttp";
import dayjs from "dayjs";
import Notify from "@/pages/components/Notify";
import { Dialog } from "@/pages/components/Dialog";
import { ResponseData } from "@/utils/http";
import PixelBox from "@/pages/components/PixelBox";
const defaultTodo: Todo = {
  name: "",
  description: "",
  type: 1,
  finishDate: dayjs().format("YYYY-MM-DD"), // 设置默认值为当前日期
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
    };
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
        close();
      } else {
        Notify.show({ type: "danger", message: res?.message || "系统错误" });
      }
    }
  };
  const deleteTodo = async () => {
    await Dialog.confirm({
      title: "确认删除",
      message: "删除后无法恢复，是否继续？",
    });
    await sendRequest({
      url: `/todo/${todo.id}`,
      method: "DELETE",
    });
    Notify.show({ type: "success", message: "删除成功" });
    close();
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
            <PixelBox
              borderColor="var(--color-button-primary)"
              borderWidth={6}
              gapSize={6}
              backgroundColor="var(--color-background-primary)"
            >
              <div
                className="text-2xl px-16 py-4 text-white"
                style={{ backgroundColor: "var(--color-button-primary)" }}
                onClick={() => form.submit()}
              >
                确定
              </div>
            </PixelBox>
            {isEditMode && (
              <PixelBox
                borderColor="var(--color-red)"
                borderWidth={6}
                gapSize={6}
                backgroundColor="var(--color-background-primary)"
              >
                <div
                  className="text-2xl px-16 py-4 text-white"
                  style={{ backgroundColor: "var(--color-red)" }}
                  onClick={deleteTodo}
                >
                  删除
                </div>
              </PixelBox>
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
          rules={[{ required: true, message: "请选择待办类型" }]}
          name="type"
          label="待办类型"
        >
          <Radio.Group defaultValue={1} direction="horizontal">
            <Radio
              name={1}
              iconRender={({ checked }) => (
                <i 
                  className={`iconfont ${checked ? 'icon-x_xuanzhong' : 'icon-x_danxuan'}`}
                  style={{ color: checked ? 'var(--color-button-primary)' : '' }} 
                />
              )}
              checkedColor="var(--color-orange)"
            >
              紧急
            </Radio>
            <Radio
              name={2}
              iconRender={({ checked }) => (
                <i 
                  className={`iconfont ${checked ? 'icon-x_xuanzhong' : 'icon-x_danxuan'}`}
                  style={{ color: checked ? 'var(--color-button-primary)' : '' }} 
                />
              )}
              checkedColor="var(--color-orange)"
            >
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
