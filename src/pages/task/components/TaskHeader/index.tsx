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
      <svg
          onClick={handleLogoClick}
          aria-hidden="true"
          width={18}
          height={18}
          className={(isJumping ? "logo-active" : "") + " w-14 h-14 logo"}
        >
          <use xlinkHref="#icon-xiangsu_xigua"></use>
        </svg>
      </div>
      <div className="text-4xl font-bold">{taskHeaderText}</div>
      <div>
      <svg
          onClick={handleLogoClick}
          aria-hidden="true"
          width={18}
          height={18}
          className={(isJumping ? "logo-active" : "") + " w-14 h-14 logo"}
        >
          <use xlinkHref="#icon-xiangsu_xigua"></use>
        </svg>
      </div>
    </div>
  );
};

export default TaskHeader;
