import { Form, Input } from "react-vant";
import dogIcon from "@/assets/dogIconBold.png";
import pigIcon from "@/assets/pigIconBold.png";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useHttp } from "@/hooks/useHttp";
import Notify from "../components/Notify";
import { ResponseData } from "@/utils/http";
import Cookie from "js-cookie";
import PixelBox from "../components/PixelBox";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { sendRequest } = useHttp();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    // 预留请求接口
    const res: ResponseData | null = await sendRequest({
      url: "/user/login",
      method: "POST",
      data: values,
    });

    // 添加类型检查
    if (res && res.code === "200") {
      navigate("/task");
      // 保存登录信息到cookie
      if (res.data) {
        Cookie.set("user", JSON.stringify(res.data));
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
            <img src={dogIcon} alt="Dog Icon" className="w-44 mb-10 mx-auto" />
          </div>
          <div className="rotate-container later-animation">
            <img src={pigIcon} alt="Pig Icon" className="w-48 mb-10 mx-auto" />
          </div>
        </div>
        <h1 className="text-7xl font-bold mb-15">
            <span style={{ color: "var(--color-button-primary)" }}>GoGo</span>
            Habit
          </h1>
        <Form form={form} onFinish={handleLogin} className="w-full">
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
            <PixelBox
              borderColor="var(--color-button-primary)"
              borderWidth={6}
              gapSize={6}
              backgroundColor="var(--color-tertiary)"
            >
              <div
                className="text-2xl px-28 py-4 text-white"
                style={{ backgroundColor: "var(--color-button-primary)" }}
                onClick={() => form.submit()}
              >
                登录
              </div>
            </PixelBox>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
