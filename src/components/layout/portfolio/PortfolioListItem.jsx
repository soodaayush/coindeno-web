import React from "react";

const PortfolioListItem = (props) => {
  return (
    <tr
      key={props.index}
      className="dark:hover:bg-gray-800 border-2 dark:border-gray-700 text-sm hover:bg-gray-200 border-gray-300"
    >
      <td className="text-center">{props.index}</td>
      <td className="text-center">
        <a
          href={`https://www.coingecko.com/en/coins/${props.data.coinName}`}
          target="_blank"
          rel="noreferrer"
          className="outline-none"
        >
          {props.data.coinName}
        </a>
      </td>
      <td className="text-center">
        {new Intl.NumberFormat("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        }).format(props.data.coinAmount)}
      </td>
      <td className="text-center">
        <span className="inline-block text-right w-5/12">
          {new Intl.NumberFormat("en", {
            style: "currency",
            currency: props.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 8,
          }).format(props.data.coinPrice)}
        </span>
      </td>
      <td className="text-center">
        <span className="inline-block text-right w-5/12">
          {new Intl.NumberFormat("en", {
            style: "currency",
            currency: props.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(props.data.coinValue)}
        </span>
      </td>
      <td className="text-center">
        {new Intl.NumberFormat("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        }).format(
          parseFloat(props.data.coinValue / props.totalPortfolioValue) * 100
        )}
        %
      </td>
    </tr>
  );
};

export default PortfolioListItem;
