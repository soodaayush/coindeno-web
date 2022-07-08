import { FaPlus } from "react-icons/fa";

const Add = (props) => {
  return (
    <button
      className="outline-none rounded p-2 px-4 text-white text-4xl"
      title={props.title}
      onClick={props.addFunction}
    >
      <FaPlus className="text-green-600 text-4xl cursor-pointer" />
    </button>
  );
};

export default Add;
