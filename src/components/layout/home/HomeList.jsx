import { useState, useEffect } from "react";

import Loading from "../../common/Loading";
import GridListItem from "../../common/GridListItem";
import configData from "../../../config.json";
import CoinService from "../../../api/services/Coin";

const HomeList = (props) => {
  const [loadedCoinData, setLoadedCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function filterData(coinList, props) {
    const searchParameters = props.searchParameters;
    const sortOrder = props.sortOrder;
    const coinNames = props.coinNames;

    if (searchParameters === null || searchParameters === undefined)
      return coinList;

    for (let i = 0; i < searchParameters.length; i++) {
      let valueFrom = parseFloat(searchParameters[i].value1);
      let valueTo = parseFloat(searchParameters[i].value2);

      switch (searchParameters[i].operator) {
        case "<":
          coinList = coinList.filter(
            (d) =>
              d[searchParameters[i].field] < valueFrom &&
              d[searchParameters[i].field] > 0
          );
          break;
        case ">":
          coinList = coinList.filter(
            (d) => d[searchParameters[i].field] > valueFrom
          );
          break;
        case "<=":
          coinList = coinList.filter(
            (d) =>
              d[searchParameters[i].field] <= valueFrom &&
              d[searchParameters[i].field] > 0
          );
          break;
        case ">=":
          coinList = coinList.filter(
            (d) => d[searchParameters[i].field] >= valueFrom
          );
          break;
        case "=":
          coinList = coinList.filter(
            (d) => d[searchParameters[i].field] === valueFrom
          );
          break;
        case "Between":
          coinList = coinList.filter(
            (d) =>
              d[searchParameters[i].field] >= valueFrom &&
              d[searchParameters[i].field] <= valueTo
          );
          break;
        default:
      }
    }

    switch (sortOrder.sortDirection.toLowerCase()) {
      case "ascending":
        coinList.sort(
          (a, b) =>
            parseFloat(a[sortOrder.sortField]) -
            parseFloat(b[sortOrder.sortField])
        );
        break;
      case "descending":
        coinList.sort(
          (a, b) =>
            parseFloat(b[sortOrder.sortField]) -
            parseFloat(a[sortOrder.sortField])
        );
        break;
      default:
    }

    if (coinNames.coinNames.length > 0) {
      coinList = coinList.filter(
        (d) =>
          coinNames.coinNames.toLowerCase().includes(d.symbol.toLowerCase()) ||
          coinNames.coinNames.toLowerCase().includes(d.name.toLowerCase())
      );
    }

    return coinList;
  }

  useEffect(() => {
    setIsLoading(true);

    let currency = props.currency
      ? props.currency
      : configData.DEFAULT_CURRENCY;

    // const results = CoinService.getInstance().getCoinLookups(currency, ['bitcoin','cardano','polkadot'])

    const allPromise = Promise.all([
      CoinService.getInstance().getCoins(currency, 1, 250),
      // CoinService.getInstance().getCoins(currency, 2, 250),
      // CoinService.getInstance().getCoins(currency, 3, 250),
      // CoinService.getInstance().getCoins(currency, 4, 250),
    ]);

    allPromise.then((results) => {
      let coinList = [];

      results.forEach((result) => {
        coinList = coinList.concat(result);
      });

      setIsLoading(false);

      coinList = filterData(coinList, props);
      setLoadedCoinData(coinList);
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
    <div className="mt-4 px-8">
      <table className="w-full">
        <thead key="thead" className="dark:bg-gray-700 bg-gray-300">
          <tr className="border-2 dark:border-gray-700 dark:bg-gray-700 border-gray-300 bg-gray-300">
            {windowDimension.winWidth > 900 && <th>#</th>}
            <th>Rank</th>
            <th>Logo</th>
            <th>Symbol</th>
            <th>Name</th>
            {windowDimension.winWidth > 425 && (
              <th className="text-right">Price</th>
            )}
            {windowDimension.winWidth > 725 && (
              <th className="text-right">24h Chg</th>
            )}
            {windowDimension.winWidth > 725 && (
              <th className="text-right">24h Chg %</th>
            )}
            {windowDimension.winWidth > 950 && (
              <th className="text-right">Circ Supply</th>
            )}
            {windowDimension.winWidth > 1050 && (
              <th className="text-right">Total Supply</th>
            )}
            {windowDimension.winWidth > 1200 && (
              <th className="text-right">Max Supply</th>
            )}
            {windowDimension.winWidth > 1250 && (
              <th className="text-right">Market Cap</th>
            )}
          </tr>
        </thead>
        <tbody key="tbody" id="coinTableBody">
          {loadedCoinData.map((coin, index) => (
            <GridListItem
              data={coin}
              index={index}
              key={index}
              currency={props.currency}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeList;
