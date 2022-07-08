import { FaTimes, FaEdit, FaStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";

const WalletVerticalListItem = (props) => {
  let states = {
    edit: true,
    data: props.data,
  };

  return (
    <tbody className="border-2 w-full dark:border-gray-700 border-gray-300">
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">#:</th>
        <td className="text-right">{props.index + 1}</td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Wallet Name:</th>
        <td className="text-right">{props.data.walletName}</td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Wallet Type:</th>
        <td className="text-right">{props.data.walletType}</td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Wallet URL:</th>
        <td className="text-right">
          <a href={props.data.walletUrl} target="_BLANK" rel="noreferrer">
            {props.data.walletUrl}
          </a>
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Notes:</th>
        <td className="text-right">
          <FaStickyNote
            className="ml-auto cursor-pointer text-green-500"
            title={props.data.notes}
          />
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Delete:</th>
        <td className="text-right">
          <FaTimes
            className="ml-auto cursor-pointer text-red-500"
            onClick={() => props.onDelete(props.data.id)}
          />
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Edit:</th>
        <td className="text-right">
          <Link to="/addWallet" state={states}>
            <FaEdit className="ml-auto cursor-pointer text-yellow-500" />
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default WalletVerticalListItem;
