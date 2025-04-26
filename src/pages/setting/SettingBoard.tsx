import dogIcon from "@/assets/dogPixel.png";
import pigIcon from "@/assets/pigPixel.png";
import otherIcon from "@/assets/other.svg";
import "./SettingBoard.scss";
import { useState, useEffect } from "react";
import PixelBox from "../components/PixelBox";
import { clearAuth, getUserInfo } from "@/utils/tokenUtils";

const bgColor = "var(--color-tertiary)";

const SettingBoard = () => {
  const [user, setUser] = useState({ nickname: "", id: 0 });
  
  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const handleLogout = () => {
    clearAuth();
    window.location.href = '/login';
  };

  // Select avatar based on user.id
  const avatarIcon = user.id === 1 ? dogIcon : user.id === 2 ? pigIcon : otherIcon;

  return (
    <div className="setting-board p-4 flex flex-col items-center justify-center">

        <div className="avatar-container">
          <img
            src={avatarIcon}
            alt="avatar"
            className="avatar h-52"
          />
        </div>
      <div className="nickname text-3xl font-medium mb-12">{user.nickname}</div>
      <div className="button-container flex flex-col gap-3 w-full max-w-xs items-center">
        <PixelBox
          borderColor="#fff"
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
