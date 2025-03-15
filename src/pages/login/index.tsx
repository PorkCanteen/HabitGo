import { Form, Input, Button, Dialog } from "react-vant";
import dogIconBold from "@/assets/dogIconBold.png";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useHttp } from "@/hooks/useHttp";

const Login = () => {
  const navigate = useNavigate();
  const {sendRequest} = useHttp();
  
  const handleLogin = async (values: { username: string; password: string }) => {
    // 预留请求接口
    const res: any = await sendRequest({
      url: "/user/login",
      method: "POST",
      data: values,
    });
    console.log("Login values:", res);
    if(res.code === "200") {
      navigate("/task");
    } else {
      console.log("Login failed:", res.message);
      // Dialog.alert({
      //   message: res.message,
      // })
    }
  };

  return (
    <div className="login-body flex items-center justify-center min-h-screen text-center w-full">
      <div className="flex flex-col items-center w-full px-12">
        <div className="rotate-container">
          <img
            src={dogIconBold}
            alt="Dog Icon"
            className="w-40 mb-10 mx-auto"
          />
        </div>
        <h1 className="text-5xl font-bold mb-15">
          <span style={{ color: "#f19c34" }}>GoGo</span>Habit
        </h1>
        <Form onFinish={handleLogin} className="w-full">
          <Form.Item
            name="username"
            label={<span>账号</span>}
            rules={[{ required: true, message: "请输入账号" }]}
            className="mb-4 w-full"
          >
            <Input placeholder="账号" />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span>密码</span>}
            rules={[{ required: true, message: "请输入密码" }]}
            className="mb-4 w-full"
          >
            <Input type="password" placeholder="密码" />
          </Form.Item>
          <div className="flex justify-center">
            <Button
              round
              nativeType="submit"
              color="#f19c34"
              block
              className="w-1/2 mt-6"
            >
              登录
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
