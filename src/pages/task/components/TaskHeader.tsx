import { Ellipsis } from "@react-vant/icons";
import dogIcon from "@/assets/dogIcon.svg";
import './taskHeader.scss'

const taskHeaderText = "待办任务";
const TaskHeader = () => {
  return (
    <div className="flex justify-between items-center h-20 px-4 bg-green-100 text-3xl">
      <div>
        <img src={dogIcon} alt="" className="w-12 h-12 logo"  />
      </div>
      <div className="text-3xl">{taskHeaderText}</div>
      <div>
        <Ellipsis fontSize={"24px"} />
      </div>
    </div>
  );
};

export default TaskHeader;
