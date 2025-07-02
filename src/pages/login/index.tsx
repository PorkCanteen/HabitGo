import { Form, Input } from "react-vant";
import dogIcon from "@/assets/images/dogIconBold.png";
import pigIcon from "@/assets/images/pigIconBold.png";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useHttp } from "@/hooks/useHttp";
import Notify from "../components/Notify";
import { ResponseData } from "@/utils/http";
import { setToken, setUserInfo } from "@/utils/tokenUtils";

// 定义登录响应数据类型
interface LoginResponseData {
  token: string;
  username?: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  id?: string | number;
  [key: string]: string | number | undefined; // 其他可能的用户信息字段
}

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { sendRequest } = useHttp();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    // 预留请求接口
    const res: ResponseData<LoginResponseData> | null = await sendRequest({
      url: "/user/login",
      method: "POST",
      data: values,
    });

    // 添加类型检查
    if (res && res.code === "200") {
      // 保存token和用户信息到本地存储
      if (res.data) {
        const { token, ...userInfo } = res.data;
        setToken(token);
        setUserInfo(userInfo);
        navigate("/task");
      }
    } else {
      Notify.show({ type: "danger", message: res?.message || "系统错误" });
    }
  };

  return (
    <div className="login-body flex items-center justify-center min-h-screen text-center w-full">
      <div className="flex flex-col items-center w-full px-12">
        <div className="animate-container">
          <div className="rotate-container">
            <img src={dogIcon} alt="Dog Icon" className="w-48 mb-10 mx-auto" />
          </div>
          <div className="rotate-container later-animation">
            <img src={pigIcon} alt="Pig Icon" className="w-52 mb-10 mx-auto" />
          </div>
        </div>
        <h1 className="text-7xl font-bold mb-15">
          <span style={{ color: "var(--color-button-primary)" }}>GoGo</span>
          Habit
        </h1>
        <Form form={form} onFinish={handleLogin} className="login-form w-full">
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
            <button
              className="text-2xl px-28 py-4 text-white border-4 cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: "var(--color-button-primary)",
                borderColor: "var(--color-button-primary)",
                borderRadius: "12px",
              }}
              onClick={() => form.submit()}
            >
              登录
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
