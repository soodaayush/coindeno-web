import { FaSearch } from "react-icons/fa";

const Search = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button
        className="outline-none rounded text-4xl p-2"
        onClick={props.searchFunction}
        title="Search"
      >
        <FaSearch className="text-4xl cursor-pointer" title="Search" />
      </button>
    </div>
  );
};

export default Search;
