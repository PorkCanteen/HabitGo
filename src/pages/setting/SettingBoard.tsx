import dogIcon from "@/assets/dogIconBold.png";
import './SettingBoard.scss';

const SettingBoard = () => {
  return (
    <div className="setting-board p-4 flex flex-col items-center justify-center">
      <div className="avatar-container mb-4">
        <img src={dogIcon} alt="avatar" className="avatar w-60 h-60 rounded-full" />
      </div>
      <div className="username text-xl font-medium mb-6">用户名</div>
      <div className="button-container flex flex-col gap-3 w-full max-w-xs items-center">
        <button className="setting-button bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-xl">设置</button>
        <button className="help-button bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-xl">帮助</button>
        <button className="logout-button bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-xl">退出登录</button>
      </div>
    </div>
  );
};

export default SettingBoard;