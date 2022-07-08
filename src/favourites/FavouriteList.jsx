import { useState, useEffect } from "react";

import CoinService from "../api/services/Coin";
import GridListItem from "../components/common/GridListItem";
import Loading from "../components/common/Loading";

const FavouriteList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState([]);

  function GetValue(obj) {
    if (obj === undefined) return "";
    if (obj === null) return "";

    return obj;
  }

  useEffect(() => {
    setCoinData([]);

    const favouriteCoins = props.favouriteData;

    const currency = props.currency.toLowerCase();

    if (favouriteCoins.length > 0) {
      let tickers = favouriteCoins.map((a) => {
        return a.favouriteCoin;
      });

      const results = CoinService.getInstance().consolidateCoinData(tickers);

      results.then((coinData) => {
        const coins = [];

        coinData.forEach((data) => {
          const key = favouriteCoins.filter((c) => c.favouriteCoin === data.id);

          if (!data.error) {
            let coin = {
              market_cap_rank: GetValue(data.market_cap_rank),
              image: GetValue(data.image.thumb),
              symbol: GetValue(data.symbol),
              name: GetValue(data.name),
              current_price: GetValue(data.market_data.current_price[currency]),
              price_change_24h: GetValue(
                data.market_data.price_change_24h_in_currency[currency]
              ),
              price_change_percentage_24h: GetValue(
                data.market_data.price_change_percentage_24h_in_currency[
                  currency
                ]
              ),
              circulating_supply: GetValue(data.market_data.circulating_supply),
              total_supply: GetValue(data.market_data.total_supply),
              max_supply: GetValue(data.market_data.max_supply),
              market_cap: GetValue(data.market_data.market_cap[currency]),
              id: data.id,
              key: key.length > 0 ? key[0].key : "",
            };
            coins.push(coin);
          }
        });

        coins.sort((a, b) => (a.market_cap_rank > b.market_cap_rank ? 1 : -1));

        setIsLoading(false);
        setCoinData(coins);
      });
    }
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
    <div className="px-8">
      <table className="w-full my-5">
        <thead className="dark:bg-gray-700 bg-gray-300">
          <tr className="border-2 dark:border-gray-700 border-gray-300">
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
            {windowDimension.winWidth > 1250 && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {coinData.map((coin, index) => (
            <GridListItem
              data={coin}
              index={index}
              key={index}
              currency={props.currency}
              onDelete={props.onDelete}
              delete={true}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavouriteList;
