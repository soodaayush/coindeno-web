import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Refresh from "../components/common/Refresh";
import Search from "../components/common/Search";
import HomeList from "../components/layout/home/HomeList";

const Home = (props) => {
  const location = useLocation();
  const history = useNavigate();

  const selectedCurrency = useSelector(
    (currencyState) => currencyState.currency
  );

  const [refresh, setRefresh] = useState(false);

  let searchParams;
  let sortOrder;
  let coinNames;

  if (location.state) {
    searchParams = location.state.searchParams;
    sortOrder = location.state.sortOrder;
    coinNames = location.state.coinNames;
  }

  function onRefreshHandler() {
    setRefresh(!refresh);
  }

  function sendToSearchingPage() {
    history("/search");
  }

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

  return (
    <div>
      <div className="flex justify-between items-center px-8">
        <div className="flex justify-start items-center w-full">
          {windowDimension.winWidth > 370 && (
            <div className="flex justify-between items-center">
              <h1 className="text-4xl">Cryptocurrency Prices by Market Cap</h1>
            </div>
          )}
          {windowDimension.winWidth <= 370 && (
            <div className="flex flex-col justify-between">
              <div className="flex">
                <Refresh refreshFunction={onRefreshHandler} />
                <Search searchFunction={sendToSearchingPage} />
              </div>
              <h1 className="text-4xl">Cryptocurrency Prices by Market Cap</h1>
            </div>
          )}
          {windowDimension.winWidth > 425 && (
            <div className="flex ml-3">
              <Refresh refreshFunction={onRefreshHandler} />
              <Search searchFunction={sendToSearchingPage} />
            </div>
          )}
          {windowDimension.winWidth <= 425 && windowDimension.winWidth > 370 && (
            <div className="flex flex-col ml-3">
              <Refresh refreshFunction={onRefreshHandler} />
              <Search searchFunction={sendToSearchingPage} />
            </div>
          )}
        </div>
      </div>
      <HomeList
        onRefreshHandler={onRefreshHandler}
        refresh={refresh}
        currency={selectedCurrency}
        searchParameters={searchParams}
        sortOrder={sortOrder}
        coinNames={coinNames}
      />
      <br />
    </div>
  );
};

export default Home;
