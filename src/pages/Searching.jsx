import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Searching = (props) => {
  const history = useNavigate();

  const [priceBetween, setPriceBetween] = useState(false);
  const [circSupplyBetween, setCircSupplyBetween] = useState(false);
  const [totalSupplyBetween, setTotalSupplyBetween] = useState(false);
  const [maxSupplyBetween, setMaxSupplyBetween] = useState(false);
  const [marketCapBetween, setMarketCapBetween] = useState(false);

  const coinNameInputRef = useRef();

  const priceSelectRef = useRef();
  const priceInputRef1 = useRef();
  const priceInputRef2 = useRef();

  const circSupplySelectRef = useRef();
  const circSupplyInputRef1 = useRef();
  const circSupplyInputRef2 = useRef();

  const totalSupplySelectRef = useRef();
  const totalSupplyInputRef1 = useRef();
  const totalSupplyInputRef2 = useRef();

  const maxSupplySelectRef = useRef();
  const maxSupplyInputRef1 = useRef();
  const maxSupplyInputRef2 = useRef();

  const marketCapSelectRef = useRef();
  const marketCapInputRef1 = useRef();
  const marketCapInputRef2 = useRef();

  const orderingSelectRef = useRef();
  const directionSelectRef = useRef();

  function priceSelectFunction(e) {
    if (e.target.value === "Between") {
      setPriceBetween(true);
    } else {
      setPriceBetween(false);
    }
  }

  function circSupplySelectFunction(e) {
    if (e.target.value === "Between") {
      setCircSupplyBetween(true);
    } else {
      setCircSupplyBetween(false);
    }
  }

  function totalSupplySelectFunction(e) {
    if (e.target.value === "Between") {
      setTotalSupplyBetween(true);
    } else {
      setTotalSupplyBetween(false);
    }
  }

  function maxSupplySelectFunction(e) {
    if (e.target.value === "Between") {
      setMaxSupplyBetween(true);
    } else {
      setMaxSupplyBetween(false);
    }
  }

  function marketCapSelectFunction(e) {
    if (e.target.value === "Between") {
      setMarketCapBetween(true);
    } else {
      setMarketCapBetween(false);
    }
  }

  function IsControlVisible(controlObject) {
    if (controlObject === undefined) return "";
    if (controlObject === null) return "";
    if (controlObject.current === undefined) return "";
    if (controlObject.current === null) return "";

    return controlObject.current.value;
  }

  function submitForm(e) {
    e.preventDefault();

    let ranging = [];

    let priceObject = {
      operator: priceSelectRef.current.value,
      field: priceInputRef1.current.name,
      value1:
        priceInputRef1.current.value !== undefined
          ? priceInputRef1.current.value
          : "",
      value2: IsControlVisible(priceInputRef2),
    };

    ranging.push(priceObject);

    let circSupplyObject = {
      operator: circSupplySelectRef.current.value,
      field: circSupplyInputRef1.current.name,
      value1:
        circSupplyInputRef1.current.value !== undefined
          ? circSupplyInputRef1.current.value
          : "",
      value2: IsControlVisible(circSupplyInputRef2),
    };

    ranging.push(circSupplyObject);

    let totalSupplyObject = {
      operator: totalSupplySelectRef.current.value,
      field: totalSupplyInputRef1.current.name,
      value1:
        totalSupplyInputRef1.current.value !== undefined
          ? totalSupplyInputRef1.current.value
          : "",
      value2: IsControlVisible(totalSupplyInputRef2),
    };

    ranging.push(totalSupplyObject);

    let maxSupplyObject = {
      operator: maxSupplySelectRef.current.value,
      field: maxSupplyInputRef1.current.name,
      value1:
        maxSupplyInputRef1.current.value !== undefined
          ? maxSupplyInputRef1.current.value
          : "",
      value2: IsControlVisible(maxSupplyInputRef2),
    };

    ranging.push(maxSupplyObject);

    let marketCapObject = {
      operator: marketCapSelectRef.current.value,
      field: marketCapInputRef1.current.name,
      value1:
        marketCapInputRef1.current.value !== undefined
          ? marketCapInputRef1.current.value
          : "",
      value2: IsControlVisible(marketCapInputRef2),
    };

    ranging.push(marketCapObject);

    let sortOrder = {
      sortDirection: directionSelectRef.current.value,
      sortField: orderingSelectRef.current.value,
    };

    let coinNames = {
      coinNames: coinNameInputRef.current.value,
    };

    history("/home", {
      state: {
        searchParams: ranging,
        sortOrder: sortOrder,
        coinNames: coinNames,
      },
    });
  }

  useEffect(() => {
    if (coinNameInputRef.current) {
      coinNameInputRef.current.focus();
    }
  }, []);

  function clearFields() {
    document.getElementById("searchForm").reset();
  }

  function goBackToHomePage() {
    history("/home");
  }

  return (
    <div className="min-h-screen">
      <form
        id="searchForm"
        className="justify-center items-center flex dark:text-white text-black"
        onSubmit={submitForm}
      >
        <div className="relative mx-auto w-3/4">
          <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Search</h3>
            </div>
            <div className="flex">
              <div className="relative p-6 flex-auto">
                <div className="mb-3">
                  <label htmlFor="">Coin Name:</label>
                </div>
                <div>
                  <Input
                    ref={coinNameInputRef}
                    type="text"
                    className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                  />
                </div>
                <div className="mt-1">
                  <div className="flex mb-3">
                    <div className="flex flex-col flex-1 mr-5">
                      <div>
                        <label htmlFor="type">Price:</label>
                      </div>
                      <div>
                        <select
                          className="px-3 py-3 my-2 placeholder-black text-black relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          id="type"
                          onChange={priceSelectFunction}
                          ref={priceSelectRef}
                        >
                          <option value="" defaultValue></option>
                          <option value="<">Less Than</option>
                          <option value=">">Greater Than</option>
                          <option value="<=">Less than equal to</option>
                          <option value=">=">Greater Than equal to</option>
                          <option value="=">Equal To</option>
                          <option value="Between">Between</option>
                        </select>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col flex-1">
                          <label className="mb-1" htmlFor="exchange">
                            From:
                          </label>
                          <Input
                            ref={priceInputRef1}
                            className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                            name="current_price"
                            type="text"
                          />
                        </div>
                        {priceBetween && (
                          <div className="flex flex-col flex-1 ml-5">
                            <label className="mb-1" htmlFor="cryptocurrency">
                              To:
                            </label>
                            <Input
                              ref={priceInputRef2}
                              className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                              name="current_price"
                              type="text"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <div>
                        <label htmlFor="type">Circ Supply:</label>
                      </div>
                      <div>
                        <select
                          className="px-3 py-3 my-2 placeholder-black text-black relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          id="type"
                          onChange={circSupplySelectFunction}
                          ref={circSupplySelectRef}
                        >
                          <option value="" defaultValue></option>
                          <option value="<">Less Than</option>
                          <option value=">">Greater Than</option>
                          <option value="<=">Less than equal to</option>
                          <option value=">=">Greater Than equal to</option>
                          <option value="=">Equal To</option>
                          <option value="Between">Between</option>
                        </select>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col flex-1">
                          <label className="mb-1" htmlFor="exchange">
                            From:
                          </label>
                          <Input
                            ref={circSupplyInputRef1}
                            className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                            name="circulating_supply"
                            type="text"
                          />
                        </div>
                        {circSupplyBetween && (
                          <div className="flex flex-col flex-1 ml-5">
                            <label className="mb-1" htmlFor="">
                              To:
                            </label>
                            <Input
                              ref={circSupplyInputRef2}
                              className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                              name="circulating_supply"
                              type="text"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <div className="flex flex-col flex-1 mr-5">
                      <div>
                        <label htmlFor="type">Total Supply:</label>
                      </div>
                      <div>
                        <select
                          className="px-3 py-3 my-2 placeholder-black text-black relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          id="type"
                          onChange={totalSupplySelectFunction}
                          ref={totalSupplySelectRef}
                        >
                          <option value="" defaultValue></option>
                          <option value="<">Less Than</option>
                          <option value=">">Greater Than</option>
                          <option value="<=">Less than equal to</option>
                          <option value=">=">Greater Than equal to</option>
                          <option value="=">Equal To</option>
                          <option value="Between">Between</option>
                        </select>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col flex-1">
                          <label className="mb-1" htmlFor="exchange">
                            From:
                          </label>
                          <Input
                            ref={totalSupplyInputRef1}
                            className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                            name="total_supply"
                            type="text"
                          />
                        </div>
                        {totalSupplyBetween && (
                          <div className="flex flex-col flex-1 ml-5">
                            <label className="mb-1" htmlFor="cryptocurrency">
                              To:
                            </label>
                            <Input
                              ref={totalSupplyInputRef2}
                              className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                              name="total_supply"
                              type="text"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <div>
                        <label htmlFor="type">Max Supply:</label>
                      </div>
                      <div>
                        <select
                          className="px-3 py-3 my-2 placeholder-black text-black relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          id="type"
                          onChange={maxSupplySelectFunction}
                          ref={maxSupplySelectRef}
                        >
                          <option value="" defaultValue></option>
                          <option value="<">Less Than</option>
                          <option value=">">Greater Than</option>
                          <option value="<=">Less than equal to</option>
                          <option value=">=">Greater Than equal to</option>
                          <option value="=">Equal To</option>
                          <option value="Between">Between</option>
                        </select>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col flex-1">
                          <label className="mb-1" htmlFor="exchange">
                            From:
                          </label>
                          <Input
                            ref={maxSupplyInputRef1}
                            className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                            name="max_supply"
                            type="text"
                          />
                        </div>
                        {maxSupplyBetween && (
                          <div className="flex flex-col flex-1 ml-5">
                            <label className="mb-1" htmlFor="cryptocurrency">
                              To:
                            </label>
                            <Input
                              ref={maxSupplyInputRef2}
                              className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                              name="max_supply"
                              type="text"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div>
                      <label htmlFor="type">Market Cap:</label>
                    </div>
                    <div>
                      <select
                        className="px-3 py-3 my-2 placeholder-black text-black relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        id="type"
                        onChange={marketCapSelectFunction}
                        ref={marketCapSelectRef}
                      >
                        <option value="" defaultValue></option>
                        <option value="<">Less Than</option>
                        <option value=">">Greater Than</option>
                        <option value="<=">Less than equal to</option>
                        <option value=">=">Greater Than equal to</option>
                        <option value="=">Equal To</option>
                        <option value="Between">Between</option>
                      </select>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col flex-1">
                        <label className="mb-1" htmlFor="exchange">
                          From:
                        </label>
                        <Input
                          ref={marketCapInputRef1}
                          className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          name="market_cap"
                          type="text"
                        />
                      </div>
                      {marketCapBetween && (
                        <div className="flex flex-col flex-1 ml-5">
                          <label className="mb-1" htmlFor="cryptocurrency">
                            To:
                          </label>
                          <Input
                            ref={marketCapInputRef2}
                            className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                            name="market_cap"
                            type="text"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-3 p-6 flex-auto">
                <h1>Order By?</h1>
                <div className="flex">
                  <select
                    ref={orderingSelectRef}
                    className="px-3 py-3 my-2 placeholder-black text-black relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                  >
                    <option value="market_cap_rank" defaultValue>
                      Rank
                    </option>
                    <option value="current_price">Price</option>
                    <option value="price_change_24h">24h Chg</option>
                    <option value="price_change_percentage_24h">
                      24h Chg %
                    </option>
                    <option value="circulating_supply">Circ Supply</option>
                    <option value="total_supply">Total Supply</option>
                    <option value="max_supply">Max Supply</option>
                    <option value="market_cap">Market Cap</option>
                  </select>
                  <select
                    ref={directionSelectRef}
                    className="px-3 py-3 my-2 ml-5 placeholder-black text-black relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                  >
                    <option value="ascending" defaultValue>
                      Ascending
                    </option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
              <div>
                <Button
                  text="Clear"
                  type="button"
                  onClick={clearFields}
                  className="outline-none mx-2 bg-red-900 rounded px-6 py-1 text-white"
                />
              </div>
              <div className="flex">
                <Button
                  text="Back"
                  type="button"
                  onClick={goBackToHomePage}
                  className="outline-none mx-2 bg-gray-400 rounded px-6 py-1 text-white"
                />
                <Button
                  text="Search"
                  type="submit"
                  className="outline-none mx-2 bg-green-900 rounded px-6 py-1 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searching;
