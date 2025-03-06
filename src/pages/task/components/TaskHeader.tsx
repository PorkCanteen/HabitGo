import { Ellipsis } from "@react-vant/icons";
import dogIcon from "@/assets/dogIcon.svg";
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
          className={(isJumping ? "logo-active" : "") + " w-12 h-12 logo"}
          onClick={handleLogoClick}
        />
      </div>
      <div className="text-3xl">{taskHeaderText}</div>
      <div>
        <Ellipsis fontSize={"24px"} />
      </div>
    </div>
  );
};

export default TaskHeader;
