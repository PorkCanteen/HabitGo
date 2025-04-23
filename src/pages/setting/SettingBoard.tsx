import dogIcon from "@/assets/dogIconBold.png";
import "./SettingBoard.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import PixelBox from "../components/PixelBox";

const bgColor = "#ede8dc";

const SettingBoard = () => {
  const nickname = useState(
    Cookies.get("user")
      ? JSON.parse(Cookies.get("user") as string).nickname
      : ""
  );
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/login");
  };

  return (
    <div className="setting-board p-4 flex flex-col items-center justify-center">
      <PixelBox
        className="mb-8"
        borderColor="#fff"
        borderWidth={12}
        gapSize={12}
        backgroundColor={bgColor}
      >
        <div className="avatar-container">
          <img
            src={dogIcon}
            alt="avatar"
            className="avatar w-52 h-52 bg-white"
          />
        </div>
      </PixelBox>
      <div className="nickname text-3xl font-medium mb-12">{nickname}</div>
      <div className="button-container flex flex-col gap-3 w-full max-w-xs items-center">
        <PixelBox
          borderColor="#444"
          borderWidth={6}
          gapSize={6}
          backgroundColor={bgColor}
        >
          <div
            className="text-2xl px-16 py-4 "
            style={{ backgroundColor: "#fff" }}
            onClick={handleLogout}
          >
            退出登录
          </div>
        </PixelBox>
      </div>
    </div>
  );
};

export default SettingBoard;
