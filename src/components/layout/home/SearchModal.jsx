import { useState, useRef } from "react";

import Button from "../../common/Button";

const SearchModal = (props) => {
  const [priceBetween, setPriceBetween] = useState(false);
  const [circSupplyBetween, setCircSupplyBetween] = useState(false);
  const [totalSupplyBetween, setTotalSupplyBetween] = useState(false);
  const [maxSupplyBetween, setMaxSupplyBetween] = useState(false);
  const [marketCapBetween, setMarketCapBetween] = useState(false);

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

  function priceDropdown(e) {
    if (e.target.value === "Between") {
      setPriceBetween(true);
    } else {
      setPriceBetween(false);
    }
  }

  function circSupplyDropdown(e) {
    if (e.target.value === "Between") {
      setCircSupplyBetween(true);
    } else {
      setCircSupplyBetween(false);
    }
  }

  function totalSupplyDropdown(e) {
    if (e.target.value === "Between") {
      setTotalSupplyBetween(true);
    } else {
      setTotalSupplyBetween(false);
    }
  }

  function maxSupplyDropdown(e) {
    if (e.target.value === "Between") {
      setMaxSupplyBetween(true);
    } else {
      setMaxSupplyBetween(false);
    }
  }

  function marketCapDropdown(e) {
    if (e.target.value === "Between") {
      setMarketCapBetween(true);
    } else {
      setMaxSupplyBetween(false);
    }
  }

  function IsControlVisible(controlObject) {
    if (controlObject !== undefined && controlObject.current !== undefined) {
      return controlObject.current.value;
    }

    return "";
  }

  function onSearch(e) {
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

    props.loadData(ranging);

    props.openModal(!props.openModal);
  }

  return (
    <div className="flex items-center justify-center w-full">
      <form className="flex items-center justify-center flex-col p-5 border-2 rounded lg:w-2/3 container w-full">
        <div className="flex items-center my-4">
          <div className="flex flex-col items-center">
            <div>
              <h1 className="text-4xl my-4">Price</h1>
            </div>
            <div className="mb-3">
              <select
                onChange={priceDropdown}
                ref={priceSelectRef}
                className="border-2 outline-none p-1 w-full text-black"
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
              <div className="flex-1">
                <input
                  ref={priceInputRef1}
                  className="border-2 outline-none p-1 px-2 text-black"
                  type="text"
                  placeholder="Price"
                  name="current_price"
                />
              </div>
              {priceBetween && (
                <div className="flex-1 ml-5">
                  <input
                    ref={priceInputRef2}
                    className="border-2 outline-none p-1 px-2 text-black"
                    type="text"
                    placeholder="Price 2"
                    name="current_price"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <h1 className="text-4xl my-4">Circulating Supply</h1>
            </div>
            <div className="mb-3">
              <select
                ref={circSupplySelectRef}
                onChange={circSupplyDropdown}
                className="border-2 outline-none p-1 w-full text-black"
              >
                <option value="" defaultValue></option>
                <option value="<">Less Than</option>
                <option value=">">Greater Than</option>
                <option value="<=">Less than equal to</option>
                <option value=">=">Greater Than equal to</option>
                <option value="Between">Between</option>
              </select>
            </div>
            <div className="flex">
              <div className="flex-1">
                <input
                  ref={circSupplyInputRef1}
                  className="border-2 outline-none p-1 px-2 text-black"
                  type="text"
                  placeholder="Circ Supply"
                  name="circulating_supply"
                />
              </div>
              {circSupplyBetween && (
                <div className="flex-1 ml-5">
                  <input
                    ref={circSupplyInputRef2}
                    className="border-2 outline-none p-1 px-2 text-black"
                    type="text"
                    placeholder="Circ Supply 2"
                    name="circulating_supply"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center my-4">
          <div className="flex flex-col items-center">
            <div>
              <h1 className="text-4xl my-4">Total Supply</h1>
            </div>
            <div className="mb-3">
              <select
                ref={totalSupplySelectRef}
                onChange={totalSupplyDropdown}
                className="border-2 outline-none p-1 w-full text-black"
              >
                <option value="" defaultValue></option>
                <option value="<">Less Than</option>
                <option value=">">Greater Than</option>
                <option value="<=">Less than equal to</option>
                <option value=">=">Greater Than equal to</option>
                <option value="Between">Between</option>
              </select>
            </div>
            <div className="flex">
              <div className="flex-1">
                <input
                  ref={totalSupplyInputRef1}
                  className="border-2 outline-none p-1 px-2 text-black"
                  type="text"
                  placeholder="Total Supply"
                  name="total_supply"
                />
              </div>
              {totalSupplyBetween && (
                <div className="flex-1 ml-5">
                  <input
                    ref={totalSupplyInputRef2}
                    className="border-2 outline-none p-1 px-2 text-black"
                    type="text"
                    placeholder="Total Supply 2"
                    name="total_supply"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center ml-10">
            <div>
              <h1 className="text-4xl my-4">Max Supply</h1>
            </div>
            <div className="mb-3">
              <select
                ref={maxSupplySelectRef}
                onChange={maxSupplyDropdown}
                className="border-2 outline-none p-1 w-full text-black"
              >
                <option value="" defaultValue></option>
                <option value="<">Less Than</option>
                <option value=">">Greater Than</option>
                <option value="<=">Less than equal to</option>
                <option value=">=">Greater Than equal to</option>
                <option value="Between">Between</option>
              </select>
            </div>
            <div className="flex">
              <div className="flex-1">
                <input
                  ref={maxSupplyInputRef1}
                  className="border-2 outline-none p-1 px-2 text-black"
                  type="text"
                  placeholder="Max Supply"
                  name="max_supply"
                />
              </div>
              {maxSupplyBetween && (
                <div className="flex-1 ml-5">
                  <input
                    ref={maxSupplyInputRef2}
                    className="border-2 outline-none p-1 px-2 text-black"
                    type="text"
                    placeholder="Max Supply 2"
                    name="max_supply"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center my-4">
          <div>
            <h1 className="text-4xl my-4">Market Cap</h1>
          </div>
          <div className="mb-3">
            <select
              ref={marketCapSelectRef}
              onChange={marketCapDropdown}
              className="border-2 outline-none p-1 w-full text-black"
            >
              <option value="" defaultValue></option>
              <option value="<">Less Than</option>
              <option value=">">Greater Than</option>
              <option value="<=">Less than equal to</option>
              <option value=">=">Greater Than equal to</option>
              <option value="Between">Between</option>
            </select>
          </div>
          <div className="flex">
            <div className="flex-1">
              <input
                ref={marketCapInputRef1}
                className="border-2 outline-none p-1 px-2 text-black"
                type="text"
                placeholder="Market Cap"
                name="market_cap"
              />
            </div>
            {marketCapBetween && (
              <div className="flex-1 ml-5">
                <input
                  ref={marketCapInputRef2}
                  className="border-2 outline-none p-1 px-2 text-black"
                  type="text"
                  placeholder="Market Cap 2"
                  name="market_cap"
                />
              </div>
            )}
          </div>
        </div>
        <div className="my-4 flex">
          <Button
            text="Close"
            type="button"
            onClick={props.closeModal}
            className="outline-none mx-2 bg-gray-400 rounded px-6 py-1 text-white"
          />
          <Button
            text="Search"
            type="submit"
            onClick={onSearch}
            className="outline-none mx-2 bg-red-900 rounded px-6 py-1 text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchModal;
