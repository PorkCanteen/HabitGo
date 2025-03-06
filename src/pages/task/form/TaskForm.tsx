import { Button, Input, Form, Radio } from "react-vant";
const defaultTask = { taskType: 1, targetType: 1, targetCount: "1" };

const TaskForm = ({ task = defaultTask }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
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
          </div>
        }
        initialValues={task}
      >
        <Form.Item
          tooltip={{
            message: "请确保任务名唯一",
          }}
          rules={[{ required: true, message: "请填写任务名" }]}
          name="name"
          label="任务名"
        >
          <Input placeholder="请输入任务名" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "请填写任务描述" }]}
          name="description"
          label="任务描述"
        >
          <Input.TextArea placeholder="请输入任务描述" />
        </Form.Item>
        <Form.Item
          rules={[{ required: false, message: "请选择分类" }]}
          name="taskType"
          label="分类"
        >
          <Radio.Group>
            <Radio name={1} iconSize={15} checkedColor="#f8a128">
              主要任务
            </Radio>
            <Radio name={2} iconSize={15} checkedColor="#f8a128">
              次要任务
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "请选择目标" }]}
          name="targetType"
          label="目标类型"
        >
          <Radio.Group>
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
        <Form.Item
          rules={[{ required: true, message: "请输入目标次数" }]}
          name="targetCount"
          label="目标次数"
        >
          <Input type="digit" placeholder="请输入目标次数" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
