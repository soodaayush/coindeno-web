import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import FavouriteService from "../api/services/Favourite";
import CoinService from "../api/services/Coin";

import Input from "../components/common/Input";
import FavouriteList from "../favourites/FavouriteList";
import Add from "../components/common/Add";
import Refresh from "../components/common/Refresh";

const Favourites = () => {
  const history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_token")) {
      history("/login");
    }
  }, []);

  const selectedCurrency = useSelector(
    (currencyState) => currencyState.currency
  );

  const [favouriteData, setFavouriteData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const favouriteSelectRef = useRef();

  function addFavourite() {
    let enteredFavouriteCoin = favouriteSelectRef.current.value;

    if (!enteredFavouriteCoin) {
      alert("Please provide a valid coin ticker to add!");
      favouriteSelectRef.current.focus();
      return;
    }

    enteredFavouriteCoin = enteredFavouriteCoin.toLowerCase();

    let favourite = {
      favouriteCoin: enteredFavouriteCoin,
    };

    const result = CoinService.getInstance().getCoinData(enteredFavouriteCoin);

    result.then((data) => {
      if (data.error) {
        alert(
          `Invalid coin ticker "${enteredFavouriteCoin}" or coin not found`
        );
        favouriteSelectRef.current.focus();
        return;
      }

      FavouriteService.getInstance()
        .createFavourite(favourite)
        .then((data) => {
          let newCoin = {
            key: data.name,
            favouriteCoin: enteredFavouriteCoin,
          };
          favouriteSelectRef.current.value = "";
          favouriteSelectRef.current.focus();
          setFavouriteData((favouriteData) => [...favouriteData, newCoin]);
        });
    });
  }

  function deleteFavourite(id, name) {
    if (
      window.confirm(
        `Are you sure you want to delete "${name}" from favourites?`
      )
    ) {
      FavouriteService.getInstance()
        .deleteFavourite(id)
        .then(() => {
          let remaining = favouriteData.filter((t) => t.key !== id);
          setFavouriteData(remaining);
        });
    }
  }

  function onRefreshHandler() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    FavouriteService.getInstance()
      .getFavourites()
      .then((data) => {
        let coinArray = [];

        for (const key in data) {
          const coin = {
            key: key,
            ...data[key],
          };

          coinArray.push(coin);
        }

        setFavouriteData(coinArray);
      });
  }, []);

  return (
    <div>
      <div className="flex px-8 items-center justify-between">
        <div className="flex justify-start items-center w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">Favourites</h1>
          </div>
          <div className="ml-3">
            <Refresh refreshFunction={onRefreshHandler} />
          </div>
          <div className="ml-5 flex justify-between items-center">
            <Input
              type="text"
              ref={favouriteSelectRef}
              className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              placeholder="enter coin ticker"
            />
            <Add addFunction={addFavourite} />
          </div>
        </div>
      </div>
      <FavouriteList
        favouriteData={favouriteData}
        onDelete={deleteFavourite}
        currency={selectedCurrency}
      />
      <br />
    </div>
  );
};

export default Favourites;
