import { Link } from "react-router-dom";
import { FaTimes, FaEdit, FaStickyNote } from "react-icons/fa";
import moment from "moment";

const TransactionListItem = (props) => {
  let states = {
    edit: true,
    data: props.data,
  };

  return (
    <tr className="dark:hover:bg-gray-800 border-2 dark:border-gray-700 text-sm hover:bg-gray-200 border-gray-300">
      <td className="text-center">{props.index + 1}</td>
      <td className="text-center">{props.data.transactionType}</td>
      <td className="text-center">{props.data.cryptoCurrency}</td>
      <td className="text-center">
        {new Intl.NumberFormat("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(props.data.coinAmount)}
      </td>
      <td className="text-center">
        {/* ${props.data.fiatAmount !== "" ? props.data.dollarAmount : 0} */}
        {new Intl.NumberFormat("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(props.data.fiatAmount)}
      </td>
      <td className="text-center">
        {props.data.currency !== "" ? props.data.currency : ""}
      </td>
      <td className="text-center">
        {props.data.exchange !== "" ? props.data.exchange : ""}
      </td>
      <td className="text-center">
        ${props.data.fee !== "" ? props.data.fee : 0}
      </td>
      <td className="text-center">
        {moment(props.data.dateTime).format("LLL")}
      </td>
      <td className="text-center">{props.data.wallet}</td>
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
        <Link to="/addTransaction" state={states}>
          <FaEdit className="mx-auto cursor-pointer text-yellow-500" />
        </Link>
      </td>
    </tr>
  );
};

export default TransactionListItem;
