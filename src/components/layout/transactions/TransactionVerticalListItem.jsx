import moment from "moment";
import { FaTimes, FaEdit, FaStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";

const TransactionVerticalListItem = (props) => {
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
        <th className="text-left w-full">Transaction Type:</th>
        <td className="text-right w-full">{props.data.transactionType}</td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Name:</th>
        <td className="text-right">{props.data.cryptoCurrency}</td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Coin Amount:</th>
        <td className="text-right">
          {new Intl.NumberFormat("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(props.data.coinAmount)}
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Fiat Amount:</th>
        <td className="text-right">
          {new Intl.NumberFormat("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(props.data.fiatAmount)}
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Currency:</th>
        <td className="text-right">
          {props.data.currency !== "" ? props.data.currency : ""}
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Exchange:</th>
        <td className="text-right">
          {props.data.exchange !== "" ? props.data.exchange : ""}
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Fee:</th>
        <td className="text-right">
          {props.data.fee !== "" ? props.data.fee : 0}
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Date & Time:</th>
        <td className="text-right">
          {moment(props.data.dateTime).format("LLL")}
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Wallet:</th>
        <td className="text-right">{props.data.wallet}</td>
      </tr>
      <tr>
        <th className="text-left">Notes:</th>
        <td className="text-right">
          <FaStickyNote
            className="ml-auto cursor-pointer text-green-500"
            title={props.data.notes}
          />
        </td>
      </tr>
      <tr>
        <th className="text-left">Delete:</th>
        <td className="text-right">
          <FaTimes
            className="ml-auto cursor-pointer text-red-500"
            onClick={() => props.onDelete(props.data.id)}
          />
        </td>
      </tr>
      <tr>
        <th className="text-left">Notes:</th>
        <td className="text-right">
          <Link to="/addTransaction" state={states}>
            <FaEdit className="ml-auto cursor-pointer text-yellow-500" />
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default TransactionVerticalListItem;
