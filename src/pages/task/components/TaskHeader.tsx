import dogIcon from "@/assets/dogIcon.png";
import pigIcon from "@/assets/pigIcon.png";
import "./taskHeader.scss";
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
    <div className="flex justify-between items-center h-20 px-4 bg-green-100 text-3xl">
      <div>
        <img
          src={dogIcon}
          alt=""
          className={(isJumping ? "logo-active" : "") + " w-14 h-14 logo"}
          onClick={handleLogoClick}
        />
      </div>
      <div className="text-3xl">{taskHeaderText}</div>
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
