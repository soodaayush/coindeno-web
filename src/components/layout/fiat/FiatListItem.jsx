import { FaTimes, FaEdit, FaStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

const FiatListItem = (props) => {
  let states = {
    edit: true,
    data: props.data,
  };

  return (
    <tr className="dark:hover:bg-gray-800 border-2 dark:border-gray-700 text-sm hover:bg-gray-200 border-gray-300">
      <td className="text-center">{props.index + 1}</td>
      <td className="text-center">{props.data.from}</td>
      <td className="text-center">{props.data.to}</td>
      <td className="text-center">
        {new Intl.NumberFormat("en", {
          style: "currency",
          currency: props.data.currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        }).format(props.data.amount)}
      </td>
      <td className="text-center">{props.data.status}</td>
      <td className="text-center">
        {moment(props.data.dateTime).format("LLL")}
      </td>
      <td className="text-center">{props.data.reference}</td>
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
        <Link to="/addFiat" state={states}>
          <FaEdit className="mx-auto cursor-pointer text-yellow-500" />
        </Link>
      </td>
    </tr>
  );
};

export default FiatListItem;
