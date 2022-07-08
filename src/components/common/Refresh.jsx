import { FaSync } from "react-icons/fa";

const Refresh = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button
        className="outline-none rounded text-4xl p-2"
        onClick={props.refreshFunction}
        title="Refresh"
      >
        <FaSync className="text-4xl cursor-pointer" />
      </button>
    </div>
  );
};

export default Refresh;
