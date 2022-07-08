import { useState, useEffect } from "react";

import CoinService from "../../../api/services/Coin";
import Loading from "../../common/Loading";
import PortfolioListItem from "./PortfolioListItem";
import PortfolioVerticalListItem from "./PortfolioVerticalListItem";

const PortfolioList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coinInfo, setCoinInfo] = useState([]);

  function Sum(obj, prop) {
    let total = 0;

    for (let i = 0, _len = obj.length; i < _len; i++) {
      total += obj[i][prop];
    }

    return total;
  }

  function CalculateCoinAmt(coinArray) {
    let amountArray = [];

    coinArray.forEach((element) => {
      if (element.transactionType.toLowerCase() !== "Selling".toLowerCase()) {
        amountArray.push(element.coinAmount);
      } else {
        amountArray.push(-element.coinAmount);
      }
    });

    return amountArray;
  }

  useEffect(() => {
    var groups = {};

    for (var i = 0; i < props.coins.length; i++) {
      let coinName = props.coins[i].coinName;

      if (!groups[coinName]) {
        groups[coinName] = [];
      }

      groups[coinName].push(props.coins[i]);
    }

    let tickers = Object.keys(groups);
    let coins = Object.keys(groups).join(",");
    let currency = props.currency;

    CoinService.getInstance()
      .getPriceData(coins, currency)
      .then((data) => {
        let coinData = [];

        tickers.forEach((coin) => {
          const coinAmount = CalculateCoinAmt(groups[coin]).reduce(
            (a, b) => parseFloat(a) + parseFloat(b)
          );

          const coinPrice = Object.values(data[coin.toLowerCase()]);

          const coinValue = coinAmount * coinPrice;

          let coinItem = {
            id: coin,
            coinName: coin,
            coinAmount: coinAmount,
            coinPrice: coinPrice,
            coinValue: coinValue,
          };

          coinData.push(coinItem);
        });

        coinData.sort((a, b) => (a.coinValue > b.coinValue ? -1 : 1));

        setIsLoading(false);
        setCoinInfo(coinData);
      });
  }, [props]);

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

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-8 overflow-y-auto w-full">
      {windowDimension.winWidth > 650 && (
        <table className="w-full my-5">
          <thead className="dark:bg-gray-700 bg-gray-300">
            <tr
              key="header"
              className="dark:border-gray-700 dark:bg-gray-700 border-gray-300 bg-gray-300 border-2"
            >
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th className="text-center">
                <span className="inline-block text-right w-5/12">Price</span>
              </th>
              <th className="text-center">
                <span className="inline-block text-right w-5/12">Value</span>
              </th>
              <th>Portfolio %</th>
            </tr>
          </thead>
          <tbody>
            {coinInfo.map((c, index) => (
              <PortfolioListItem
                key={index + 1}
                index={index + 1}
                data={c}
                currency={props.currency}
                totalPortfolioValue={Sum(coinInfo, "coinValue")}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="dark:bg-gray-900" key="footer">
              <td></td>
              <td></td>
              <td></td>
              <td className="text-center font-bold">
                <span className="inline-block text-right w-5/12">TOTAL:</span>
              </td>
              <td className="text-center font-bold">
                <span className="inline-block text-right w-5/12">
                  {new Intl.NumberFormat("en", {
                    style: "currency",
                    currency: props.currency,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(Sum(coinInfo, "coinValue"))}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
      {windowDimension.winWidth <= 650 && (
        <div className="w-full">
          <table className="w-full my-5">
            {coinInfo.map((c, index) => (
              <PortfolioVerticalListItem
                key={index + 1}
                index={index + 1}
                data={c}
                currency={props.currency}
                totalPortfolioValue={Sum(coinInfo, "coinValue")}
              />
            ))}
          </table>
          <div className="w-full my-5 font-bold">
            <p className="text-right w-full">
              TOTAL:{" "}
              {new Intl.NumberFormat("en", {
                style: "currency",
                currency: props.currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(Sum(coinInfo, "coinValue"))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
