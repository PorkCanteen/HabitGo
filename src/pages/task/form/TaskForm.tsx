import { Button, Input, Form, Radio } from "react-vant";

const TaskForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="px-6">
      <Form
        form={form}
        onFinish={onFinish}
        footer={
          <div style={{ margin: "16px 16px 0" }}>
            <Button round nativeType="submit" color="#f19c34"  block>
              确定
            </Button>
          </div>
        }
      >
        <Form.Item
          tooltip={{
            message:
              "请确保任务名唯一",
          }}
          rules={[{ required: true, message: "请填写任务名" }]}
          name="taskName"
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
          <Radio.Group defaultValue="1">
            <Radio name="1" iconSize={15} checkedColor="#f8a128">分类1</Radio>
            <Radio name="2" iconSize={15} checkedColor="#f8a128">分类2</Radio>
            <Radio name="2" iconSize={15} checkedColor="#f8a128">分类3</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
