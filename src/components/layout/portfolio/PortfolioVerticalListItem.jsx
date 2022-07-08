const PortfolioVerticalListItem = (props) => {
  return (
    <tbody className="border-2 w-full dark:border-gray-700 border-gray-300">
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">#:</th>
        <td className="text-right">{props.index}</td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left w-full">Name:</th>
        <td className="text-right w-full">
          <a
            href={`https://www.coingecko.com/en/coins/${props.data.coinName}`}
            target="_blank"
            rel="noreferrer"
            className="outline-none"
          >
            {props.data.coinName}
          </a>
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Amount:</th>
        <td className="text-right">
          {new Intl.NumberFormat("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          }).format(props.data.coinAmount)}
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Price:</th>
        <td className="text-right">
          <span className="text-right">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: props.currency,
              minimumFractionDigits: 0,
              maximumFractionDigits: 8,
            }).format(props.data.coinPrice)}
          </span>
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Value:</th>
        <td className="text-right">
          <span className="inline-block text-right">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: props.currency,
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(props.data.coinValue)}
          </span>
        </td>
      </tr>
      <tr className="dark:hover:bg-gray-800">
        <th className="text-left">Portfolio %:</th>
        <td className="text-right">
          {new Intl.NumberFormat("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          }).format(
            parseFloat(props.data.coinValue / props.totalPortfolioValue) * 100
          )}
          %
        </td>
      </tr>
    </tbody>
  );
};

export default PortfolioVerticalListItem;
