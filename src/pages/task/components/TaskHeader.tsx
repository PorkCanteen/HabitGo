import { Ellipsis, BarChartO } from "@react-vant/icons";

const taskHeaderText = "待办任务";
const TaskHeader = () => {
  return (
    <div className="flex justify-between items-center h-20 px-4 bg-green-100 text-3xl">
      <div>
        <BarChartO fontSize={"24px"} />
      </div>
      <div className="text-3xl">{taskHeaderText}</div>
      <div>
        <Ellipsis fontSize={"24px"} />
      </div>
    </div>
  );
};

export default TaskHeader;
