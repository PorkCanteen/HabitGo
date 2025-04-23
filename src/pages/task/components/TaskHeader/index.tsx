import dogIcon from "@/assets/dogIconBold.png";
import pigIcon from "@/assets/pigIconBold.png";
import "./index.scss";
import { useState } from "react";

const taskHeaderText = "我的习惯";
const TaskHeader = () => {
  const [isJumping, setIsJumping] = useState(false);
  const handleLogoClick = () => {
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 1000);
  };
  return (
    <div className="header-container flex justify-between items-center h-24 px-4 text-3xl">
      <div>
        <img
          src={dogIcon}
          alt=""
          className={(isJumping ? "logo-active" : "") + " w-16 h-16 logo"}
          onClick={handleLogoClick}
        />
      </div>
      <div className="text-4xl font-bold">{taskHeaderText}</div>
      <div>
        <img
          src={pigIcon}
          alt=""
          className={(isJumping ? "logo-active" : "") + " w-16 h-16 logo"}
          onClick={handleLogoClick}
        />
      </div>
    </div>
  );
};

export default TaskHeader;
