import dogIcon from "@/assets/dogIconBold.png";
import "./SettingBoard.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from 'js-cookie';

const SettingBoard = () => {
  const nickname = useState(Cookies.get('user') ? JSON.parse(Cookies.get('user') as string).nickname : '')
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('user');
    navigate("/login");
  };

  
  return (
    <div className="setting-board p-4 flex flex-col items-center justify-center">
      <div className="avatar-container mb-4">
        <img
          src={dogIcon}
          alt="avatar"
          className="avatar w-60 h-60 rounded-full bg-white"
        />
      </div>
      <div className="nickname text-3xl font-medium mb-12">{nickname}</div>
      <div className="button-container flex flex-col gap-3 w-full max-w-xs items-center">
        <button
          className="logout-button bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-xl"
          onClick={handleLogout}
        >
          退出登录
        </button>
      </div>
    </div>
  );
};

export default SettingBoard;
