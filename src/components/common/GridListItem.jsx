import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaTimes } from "react-icons/fa";

const GridListItem = (props) => {
  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  let states = {
    coinName: props.data.name,
    coinPrice: props.data.current_price,
    currency: props.currency,
  };

  return (
    <tr className="dark:hover:bg-gray-800 border-2 dark:border-gray-700 text-sm hover:bg-gray-200 border-gray-300">
      {windowDimension.winWidth > 900 && (
        <td className="text-center">{props.index + 1}</td>
      )}
      <td className="text-center">{props.data.market_cap_rank}</td>
      <td className="flex justify-center">
        <a
          href={`https://www.coingecko.com/en/coins/${props.data.id}`}
          target="_blank"
          rel="noreferrer"
          className="outline-none"
        >
          <img
            className="w-7 mx-auto"
            src={props.data.image}
            alt={props.data.name}
          />
        </a>
      </td>
      <td className="text-center">{props.data.symbol}</td>
      <td className="text-center">{props.data.id}</td>
      {windowDimension.winWidth > 425 && (
        <td className="text-right">
          <Link to="/calculator" state={states}>
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: props.currency,
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            }).format(props.data.current_price)}
          </Link>
        </td>
      )}
      {windowDimension.winWidth > 725 && (
        <td className="text-right whitespace-nowrap">
          {isNaN(props.data.price_change_24h)
            ? ""
            : parseFloat(props.data.price_change_24h).toFixed(2)}
          {parseFloat(props.data.price_change_24h) > 0 ? (
            <FaArrowUp className="ml-2 text-green-500 inline" />
          ) : (
            ""
          )}
          {parseFloat(props.data.price_change_24h) < 0 ? (
            <FaArrowDown className="ml-2 text-red-500 inline" />
          ) : (
            ""
          )}
        </td>
      )}
      {windowDimension.winWidth > 725 && (
        <td className="text-right whitespace-nowrap">
          {isNaN(props.data.price_change_percentage_24h)
            ? ""
            : parseFloat(props.data.price_change_percentage_24h).toFixed(2)}
          {parseFloat(props.data.price_change_percentage_24h) > 0 ? (
            <FaArrowUp className="ml-2 text-green-500 inline" />
          ) : (
            ""
          )}
          {parseFloat(props.data.price_change_percentage_24h) < 0 ? (
            <FaArrowDown className="ml-2 text-red-500 inline" />
          ) : (
            ""
          )}
        </td>
      )}
      {windowDimension.winWidth > 950 && (
        <td className="text-right">
          {new Intl.NumberFormat("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(props.data.circulating_supply)}
        </td>
      )}
      {windowDimension.winWidth > 1050 && (
        <td className="text-right">
          {new Intl.NumberFormat("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(props.data.total_supply)}
        </td>
      )}
      {windowDimension.winWidth > 1200 && (
        <td className="text-right">
          {new Intl.NumberFormat("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(props.data.max_supply)}
        </td>
      )}
      {windowDimension.winWidth > 1250 && (
        <td className="text-right">
          {new Intl.NumberFormat("en", {
            style: "currency",
            currency: props.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(props.data.market_cap)}
        </td>
      )}
      {props.delete && windowDimension.winWidth > 1250 && (
        <td className="text-center">
          <FaTimes
            className="mx-auto cursor-pointer text-red-500"
            onClick={() => props.onDelete(props.data.key, props.data.name)}
          />
        </td>
      )}
    </tr>
  );
};

export default GridListItem;
