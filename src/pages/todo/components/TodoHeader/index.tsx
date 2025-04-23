import dogIcon from "@/assets/dogIconBold.png";
import pigIcon from "@/assets/pigIconBold.png";
import { useState } from "react";
import "./index.scss";
const todoHeaderText = "我的待办";
const TodoHeader = () => {
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
          src={pigIcon}
          alt=""
          className={(isJumping ? "logo-active" : "") + " w-16 h-16 logo"}
          onClick={handleLogoClick}
        />
      </div>
      <div className="text-4xl font-bold">{todoHeaderText}</div>
      <div>
        <img
          src={dogIcon}
          alt=""
          className={(isJumping ? "logo-active" : "") + " w-14 h-14 logo"}
          onClick={handleLogoClick}
        />
      </div>
    </div>
  );
};

export default TodoHeader;
