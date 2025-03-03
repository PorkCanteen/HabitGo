import { createContext, Dispatch, SetStateAction } from "react";

interface CountContextType {
  taskCount: number;
  setTaskCount: Dispatch<SetStateAction<number>>;
}

const CountContextDefaultValues: CountContextType = {
  taskCount: 0,
  setTaskCount: () => {},
};

export { CountContextDefaultValues };
const CountContext = createContext(CountContextDefaultValues);

export default CountContext;
