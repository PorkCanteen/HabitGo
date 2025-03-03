import React from "react";
import { useNavigate } from "react-router";
import { Button, Empty } from "react-vant";
export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <Empty description="您所访问的页面不存在" />
      <Button
        style={{ width: 160 }}
        round
        type="primary"
        onClick={() =>
          navigate("/task", {
            replace: true,
          })
        }
      >
        返回首页
      </Button>
    </div>
  );
};

export default NotFound;
