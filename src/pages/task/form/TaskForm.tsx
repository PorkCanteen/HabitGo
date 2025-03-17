import { Button, Input, Form, Radio } from "react-vant";
import { Task } from "../components/TaskList";
import { useHttp } from "@/hooks/useHttp";
import { useState } from "react";
import Notify from "@/pages/components/Notify";
const defaultTask: Task = {
  name: "",
  count: 0,
  isCompleted: 0,
  taskType: 1,
  targetType: 1,
  targetCount: 1,
};

const TaskForm = ({ task = defaultTask, close = () => {} }) => {
  const isEditMode = !!task.id;
  const [form] = Form.useForm();
  const { sendRequest } = useHttp();

  const [targetType, setTargetType] = useState(task.targetType);
  const handleTargetTypeChange = (value: number) => {
    setTargetType(value);
  };

  const onFinish = async (values: unknown) => {
    // 创建
    if (!isEditMode) {
      await sendRequest({
        url: "/task",
        method: "POST",
        data: values,
      });
      Notify.show({ type: 'success', message: '创建成功' });
      close();
    } else {
      // 编辑
      await sendRequest({
        url: `/task/${task.id}`,
        method: "PUT",
        data: values,
      });
      Notify.show({ type: 'success', message: '修改成功' });
      close();
    }
  };
  const deleteTask = async () => {
    await sendRequest({
      url: `/task/${task.id}`,
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
            message: "请确保习惯名唯一",
          }}
          rules={[{ required: true, message: "请填写习惯名" }]}
          name="name"
          label="习惯名"
        >
          <Input placeholder="请输入习惯名" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "请填写习惯描述" }]}
          name="description"
          label="习惯描述"
        >
          <Input.TextArea placeholder="请输入习惯描述" />
        </Form.Item>
        <Form.Item
          rules={[{ required: false, message: "请选择分类" }]}
          name="taskType"
          label="分类"
        >
          <Radio.Group>
            <Radio name={1} iconSize={15} checkedColor="#f8a128">
              主要
            </Radio>
            <Radio name={2} iconSize={15} checkedColor="#f8a128">
              次要
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "请选择目标" }]}
          name="targetType"
          label="目标类型"
        >
          <Radio.Group onChange={handleTargetTypeChange}>
            <Radio name={1} iconSize={15} checkedColor="#f8a128">
              按日
            </Radio>
            <Radio name={2} iconSize={15} checkedColor="#f8a128">
              按周
            </Radio>
            <Radio name={3} iconSize={15} checkedColor="#f8a128">
              按月
            </Radio>
          </Radio.Group>
        </Form.Item>
        {targetType !== 1 && ( // 仅在目标类型不是“按日”时显示
          <Form.Item
            rules={[{ required: true, message: "请输入目标次数" }]}
            name="targetCount"
            label="目标次数"
          >
            <Input type="digit" placeholder="请输入目标次数" />
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default TaskForm;
