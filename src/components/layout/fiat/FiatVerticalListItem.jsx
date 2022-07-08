import moment from "moment";
import { FaTimes, FaEdit, FaStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";

const FiatVerticalListItem = (props) => {
  let states = {
    edit: true,
    data: props.data,
  };

  return (
    <tbody className="border-2 w-full dark:border-gray-700 border-gray-300">
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left w-full">#:</th>
        <td className="text-right w-full">{props.index + 1}</td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">From:</th>
        <td className="text-right">{props.data.from}</td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">To:</th>
        <td className="text-right">{props.data.to}</td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Amount:</th>
        <td className="text-right">
          {new Intl.NumberFormat("en", {
            style: "currency",
            currency: props.data.currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          }).format(props.data.amount)}
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Status:</th>
        <td className="text-right">{props.data.status}</td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Date & Time:</th>
        <td className="text-right">
          {moment(props.data.dateTime).format("LLL")}
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Reference:</th>
        <td className="text-right">{props.data.reference}</td>
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
        <th className="text-left">Delete:</th>
        <td className="text-right">
          <Link to="/addFiat" state={states}>
            <FaEdit className="ml-auto cursor-pointer text-yellow-500" />
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default FiatVerticalListItem;
