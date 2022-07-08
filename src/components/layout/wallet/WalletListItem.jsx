import { FaTimes, FaEdit, FaStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";

const WalletListItem = (props) => {
  let states = {
    edit: true,
    data: props.data,
  };

  return (
    <tr className="dark:hover:bg-gray-800 border-2 dark:border-gray-700 text-sm hover:bg-gray-200 border-gray-300">
      <td className="text-center">{props.index + 1}</td>
      <td className="text-center">{props.data.walletName}</td>
      <td className="text-center">{props.data.walletType}</td>
      <td className="text-center">
        <a href={props.data.walletUrl} target="_BLANK" rel="noreferrer">
          {props.data.walletUrl}
        </a>
      </td>
      <td className="text-center">
        <FaStickyNote
          className="mx-auto cursor-pointer text-green-500"
          title={props.data.notes}
        />
      </td>
      <td className="text-center">
        <FaTimes
          className="mx-auto cursor-pointer text-red-500"
          onClick={() => props.onDelete(props.data.id)}
        />
      </td>
      <td className="text-center">
        <Link to="/addWallet" state={states}>
          <FaEdit className="mx-auto cursor-pointer text-yellow-500" />
        </Link>
      </td>
    </tr>
  );
};

export default WalletListItem;
