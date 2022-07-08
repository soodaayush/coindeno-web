import { useState, useRef } from "react";

import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const [priceCheck, setPriceCheck] = useState(false);
  const [priceBetween, setPriceBetween] = useState(false);

  const [circSupplyCheck, setCircSupplyCheck] = useState(false);
  const [circSupplyBetween, setCircSupplyBetween] = useState(false);

  const [totalSupplyCheck, setTotalSupplyCheck] = useState(false);
  const [totalSupplyBetween, setTotalSupplyBetween] = useState(false);

  const [maxSupplyCheck, setMaxSupplyCheck] = useState(false);
  const [maxSupplyBetween, setMaxSupplyBetween] = useState(false);

  const [marketCapCheck, setMarketCapCheck] = useState(false);
  const [marketCapBetween, setMarketCapBetween] = useState(false);

  const priceCheckBoxRef = useRef();
  const priceSelectRef = useRef();
  const priceInputRef1 = useRef();
  const priceInputRef2 = useRef();

  const circSupplyCheckBoxRef = useRef();
  const circSupplySelectRef = useRef();
  const circSupplyInputRef1 = useRef();
  const circSupplyInputRef2 = useRef();

  const totalSupplyCheckBoxRef = useRef();
  const totalSupplySelectRef = useRef();
  const totalSupplyInputRef1 = useRef();
  const totalSupplyInputRef2 = useRef();

  const maxSupplyCheckBoxRef = useRef();
  const maxSupplySelectRef = useRef();
  const maxSupplyInputRef1 = useRef();
  const maxSupplyInputRef2 = useRef();

  const marketCapCheckBoxRef = useRef();
  const marketCapSelectRef = useRef();
  const marketCapInputRef1 = useRef();
  const marketCapInputRef2 = useRef();

  function closeModal() {
    setOpenSearchModal(false);

    setPriceCheck(false);
    setPriceBetween(false);

    setCircSupplyCheck(false);
    setCircSupplyBetween(false);

    setTotalSupplyCheck(false);
    setTotalSupplyBetween(false);

    setMaxSupplyCheck(false);
    setMaxSupplyBetween(false);

    setMarketCapCheck(false);
    setMarketCapBetween(false);
  }

  function openModal() {
    setOpenSearchModal(true);
  }

  function enablePriceCheckBox(e) {
    if (e.target.checked) {
      setPriceCheck(true);
    } else {
      setPriceCheck(false);
    }
  }

  function priceDropdown(e) {
    if (e.target.value === "Between") {
      setPriceBetween(true);
    } else {
      setPriceBetween(false);
    }
  }

  function enableCircSupplyCheckBox(e) {
    if (e.target.checked) {
      setCircSupplyCheck(true);
    } else {
      setCircSupplyCheck(false);
    }
  }

  function circSupplyDropdown(e) {
    if (e.target.value === "Between") {
      setCircSupplyBetween(true);
    } else {
      setCircSupplyBetween(false);
    }
  }

  function enableTotalSupplyCheckBox(e) {
    if (e.target.checked) {
      setTotalSupplyCheck(true);
    } else {
      setTotalSupplyCheck(false);
    }
  }

  function totalSupplyDropdown(e) {
    if (e.target.value === "Between") {
      setTotalSupplyBetween(true);
    } else {
      setTotalSupplyBetween(false);
    }
  }

  function enableMaxSupplyCheckBox(e) {
    if (e.target.checked) {
      setMaxSupplyCheck(true);
    } else {
      setMaxSupplyCheck(false);
    }
  }

  function maxSupplyDropdown(e) {
    if (e.target.value === "Between") {
      setMaxSupplyBetween(true);
    } else {
      setMaxSupplyBetween(false);
    }
  }

  function enableMarketCapCheckBox(e) {
    if (e.target.checked) {
      setMarketCapCheck(true);
    } else {
      setMarketCapCheck(false);
    }
  }

  function marketCapDropdown(e) {
    if (e.target.value === "Between") {
      setMarketCapBetween(true);
    } else {
      setMarketCapBetween(false);
    }
  }

  function searchCurrencies(e) {
    e.preventDefault();

    let ranging = [];

    if (priceCheck) {
      let priceObject = {
        operator: priceSelectRef.current.value,
        field: priceCheckBoxRef.current.name,
        value1:
          priceInputRef1.current.value !== ""
            ? priceInputRef1.current.value
            : "",
        value2:
          priceInputRef2.current.value !== ""
            ? priceInputRef2.current.value
            : "",
      };

      ranging.push(priceObject);
    }

    if (circSupplyCheck) {
      let circSupplyObject = {
        operator: circSupplySelectRef.current.value,
        field: circSupplyCheckBoxRef.current.name,
        value1:
          circSupplyInputRef1.current.value !== ""
            ? circSupplyInputRef1.current.value
            : "",
        value2:
          circSupplyInputRef2.current.value !== ""
            ? circSupplyInputRef2.current.value
            : "",
      };

      ranging.push(circSupplyObject);
    }

    if (totalSupplyCheck) {
      let totalSupplyObject = {
        operator: totalSupplySelectRef.current.value,
        field: totalSupplyCheckBoxRef.current.name,
        value1:
          totalSupplyInputRef1.current.value !== ""
            ? totalSupplyInputRef1.current.value
            : "",
        value2:
          totalSupplyInputRef2.current.value !== ""
            ? totalSupplyInputRef2.current.value
            : "",
      };

      ranging.push(totalSupplyObject);
    }

    if (maxSupplyCheck) {
      let maxSupplyObject = {
        operator: maxSupplySelectRef.current.value,
        field: maxSupplyCheckBoxRef.current.name,
        value1:
          maxSupplyInputRef1.current.value !== ""
            ? maxSupplyInputRef1.current.value
            : "",
        value2:
          maxSupplyInputRef2.current.value !== ""
            ? maxSupplyInputRef2.current.value
            : "",
      };

      ranging.push(maxSupplyObject);
    }

    if (marketCapCheck) {
      let marketCapObject = {
        operator: marketCapSelectRef.current.value,
        field: marketCapCheckBoxRef.current.name,
        value1:
          marketCapInputRef1.current.value !== ""
            ? marketCapInputRef1.current.value
            : "",
        value2:
          marketCapInputRef2.current.value !== ""
            ? marketCapInputRef2.current.value
            : "",
      };

      ranging.push(marketCapObject);
    }

    setOpenSearchModal(false);
  }

  return (
    <div className="my-3 mx-8">
      {openSearchModal && (
        <div className="flex items-center justify-center w-full">
          <form className="flex items-center justify-center flex-col backdrop-blur-lg p-5 border-2 rounded lg:w-2/3 container w-full">
            <div className="my-3 flex">
              <fieldset className="mx-3 flex flex-col">
                <legend className="my-2">Filter By</legend>
                <label className="my-2" htmlFor="price">
                  <input
                    className="mx-2 outline-none"
                    id="price"
                    type="checkbox"
                    name="current_price"
                    onClick={enablePriceCheckBox}
                    ref={priceCheckBoxRef}
                  />
                  Price
                </label>
                {priceCheck && (
                  <div className="flex flex-col text-black my-3">
                    <select
                      className="border-2 outline-none mx-2 p-1 my-2"
                      onChange={priceDropdown}
                      ref={priceSelectRef}
                    >
                      <option value="<" defaultValue>
                        Less Than
                      </option>
                      <option value=">">Greater Than</option>
                      <option value="<=">Less than equal to</option>
                      <option value=">=">Greater Than equal to</option>
                      <option value="Between">Between</option>
                    </select>
                    <input
                      className="border-2 outline-none p-1 mx-2 my-2"
                      type="text"
                      placeholder="Price"
                      ref={priceInputRef1}
                    />
                    {priceBetween && (
                      <input
                        className="border-2 outline-none p-1 mx-2 my-2"
                        type="text"
                        placeholder="Price 2"
                        ref={priceInputRef2}
                      />
                    )}
                  </div>
                )}
                <label className="my-2" htmlFor="circSupply">
                  <input
                    className="mx-2 outline-none"
                    id="circSupply"
                    type="checkbox"
                    name="circulating_supply"
                    onClick={enableCircSupplyCheckBox}
                    ref={circSupplyCheckBoxRef}
                  />
                  Circ Supply
                </label>
                {circSupplyCheck && (
                  <div className="flex flex-col text-black my-3">
                    <select
                      className="border-2 outline-none mx-2 p-1 my-2"
                      onChange={circSupplyDropdown}
                      ref={circSupplySelectRef}
                    >
                      <option value="<" defaultValue>
                        Less Than
                      </option>
                      <option value=">">Greater Than</option>
                      <option value="<=">Less than equal to</option>
                      <option value=">=">Greater Than equal to</option>
                      <option value="Between">Between</option>
                    </select>
                    <input
                      className="border-2 outline-none p-1 mx-2 my-2"
                      type="text"
                      placeholder="Circ Supply"
                      ref={circSupplyInputRef1}
                    />
                    {circSupplyBetween && (
                      <input
                        className="border-2 outline-none p-1 mx-2 my-2"
                        type="text"
                        placeholder="Circ Supply 2"
                        ref={circSupplyInputRef2}
                      />
                    )}
                  </div>
                )}
                <label className="my-2" htmlFor="totalSupply">
                  <input
                    className="mx-2 outline-none"
                    id="totalSupply"
                    type="checkbox"
                    name="total_supply"
                    onClick={enableTotalSupplyCheckBox}
                    ref={totalSupplyCheckBoxRef}
                  />
                  Total Supply
                </label>
                {totalSupplyCheck && (
                  <div className="flex flex-col text-black my-3">
                    <select
                      className="border-2 outline-none mx-2 p-1 my-2"
                      onChange={totalSupplyDropdown}
                      ref={totalSupplySelectRef}
                    >
                      <option value="<" defaultValue>
                        Less Than
                      </option>
                      <option value=">">Greater Than</option>
                      <option value="<=">Less than equal to</option>
                      <option value=">=">Greater Than equal to</option>
                      <option value="Between">Between</option>
                    </select>
                    <input
                      className="border-2 outline-none p-1 mx-2 my-2"
                      type="text"
                      placeholder="Total Supply"
                      ref={totalSupplyInputRef1}
                    />
                    {totalSupplyBetween && (
                      <input
                        className="border-2 outline-none p-1 mx-2 my-2"
                        type="text"
                        placeholder="Total Supply"
                        ref={totalSupplyInputRef2}
                      />
                    )}
                  </div>
                )}
                <label className="my-2" htmlFor="maxSupply">
                  <input
                    className="mx-2 outline-none"
                    id="maxSupply"
                    type="checkbox"
                    name="max_supply"
                    onClick={enableMaxSupplyCheckBox}
                    ref={maxSupplyCheckBoxRef}
                  />
                  Max Supply
                </label>
                {maxSupplyCheck && (
                  <div className="flex flex-col text-black my-3">
                    <select
                      className="border-2 outline-none mx-2 p-1 my-2"
                      onChange={maxSupplyDropdown}
                      ref={maxSupplySelectRef}
                    >
                      <option value="<" defaultValue>
                        Less Than
                      </option>
                      <option value=">">Greater Than</option>
                      <option value="<=">Less than equal to</option>
                      <option value=">=">Greater Than equal to</option>
                      <option value="Between">Between</option>
                    </select>
                    <input
                      className="border-2 outline-none p-1 mx-2 my-2"
                      type="text"
                      placeholder="Max Supply"
                      ref={maxSupplyInputRef1}
                    />
                    {maxSupplyBetween && (
                      <input
                        className="border-2 outline-none p-1 mx-2 my-2"
                        type="text"
                        placeholder="Max Supply 2"
                        ref={maxSupplyInputRef2}
                      />
                    )}
                  </div>
                )}
                <label className="my-2" htmlFor="marketCap">
                  <input
                    className="mx-2 outline-none"
                    id="marketCap"
                    type="checkbox"
                    name="market_cap"
                    onClick={enableMarketCapCheckBox}
                    ref={marketCapCheckBoxRef}
                  />
                  Market Cap
                </label>
                {marketCapCheck && (
                  <div className="flex flex-col text-black my-3">
                    <select
                      className="border-2 outline-none mx-2 p-1 my-2"
                      onChange={marketCapDropdown}
                      ref={marketCapSelectRef}
                    >
                      <option value="<" defaultValue>
                        Less Than
                      </option>
                      <option value=">">Greater Than</option>
                      <option value="<=">Less than equal to</option>
                      <option value=">=">Greater Than equal to</option>
                      <option value="Between">Between</option>
                    </select>
                    <input
                      className="border-2 outline-none p-1 mx-2 my-2"
                      type="text"
                      placeholder="Market Cap"
                      ref={marketCapInputRef1}
                    />
                    {marketCapBetween && (
                      <input
                        className="border-2 outline-none p-1 mx-2 my-2"
                        type="text"
                        placeholder="Market Cap 2"
                        ref={marketCapInputRef2}
                      />
                    )}
                  </div>
                )}
              </fieldset>
              <fieldset className="mx-3">
                <legend>Order By</legend>
                <div className="flex text-black my-2">
                  <select
                    className="border-2 outline-none mx-2 p-1 my-2"
                    id="rank"
                  >
                    <option value="Rank">Rank</option>
                    <option value="Price">Price</option>
                    <option value="24hChange">24h Change</option>
                    <option value="24hChange%">24h Change %</option>
                    <option value="circSupply">Circ Supply</option>
                    <option value="maxSupply">Max Supply</option>
                    <option value="marketCap">Market Cap</option>
                  </select>
                  <select
                    className="border-2 outline-none mx-2 p-1 my-2"
                    id="ascendDescend"
                  >
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                  </select>
                </div>
              </fieldset>
            </div>
            <div className="my-2">
              <button
                className="outline-none mx-2 bg-red-400 rounded px-6 py-1 text-white"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="outline-none mx-2 bg-green-400 rounded px-6 py-1 text-white"
                onClick={searchCurrencies}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}
      <div>
        <button className="cursor-pointer outline-none">
          <FaSearch
            onClick={openModal}
            className="text-4xl cursor-pointer"
            title="Search"
          />
        </button>
      </div>
    </div>
  );
};

export default Search;
