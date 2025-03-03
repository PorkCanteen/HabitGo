import { Ellipsis, ClockO } from "@react-vant/icons";

const taskHeaderText = '待办任务'
const TaskHeader = () => {
  return <div className="flex justify-between items-center h-16 px-4 bg-blue-50 text-3xl">
    <div>
      <ClockO fontSize={'24px'} />
    </div>
    <div className="text-3xl">{taskHeaderText}</div>
    <div>
      <Ellipsis fontSize={'24px'} />
    </div>
  </div>;
};

export default TaskHeader;
