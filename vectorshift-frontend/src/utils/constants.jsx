import { MdInput, MdOutlineOutput, MdTextFields, MdCallSplit } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import { GrAggregate } from "react-icons/gr";

export const API_BASE_URL = 'http://localhost:8000';

export const API_ENDPOINTS = {
  PARSE_PIPELINE: '/pipelines/parse'
};

export const NODE_ICONS = {
  input: <MdInput />,
  output: <MdOutlineOutput />,
  text: <MdTextFields />,
  llm: <RiRobot2Line />,
  filter: <IoSearchOutline />,
  transformer: <CiSettings />,
  validator: <IoMdCheckmark />,
  aggregator: <GrAggregate />,
  splitter: <MdCallSplit />
};

export const ERROR_MESSAGES = {
  EMPTY_PIPELINE: 'Please add at least one node',
  NETWORK_ERROR: 'Failed to connect to backend. Make sure it\'s running on http://localhost:8000'
};
