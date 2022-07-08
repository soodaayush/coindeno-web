import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

// import Currency from "../components/common/Currency";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
// import configData from "../config.json";

const Calculator = (props) => {
  let [cryptoPrice, setCryptoPrice] = useState([]);

  const location = useLocation();
  const history = useNavigate();

  const calculationSelectRef = useRef();
  const priceInputRef = useRef();
  const holdingAmountRef = useRef();

  let coinName;
  let coinPrice;
  let holdingValue;
  let currency;

  if (location.state !== null && location.state !== undefined) {
    coinName = location.state.coinName;
    coinPrice = location.state.coinPrice;
    currency = location.state.currency;
  }

  // function onChangeHandler(e) {
  //   const enteredCurrency = e.target.value;
  //   setCurrency(enteredCurrency);
  // }

  const currencyFormatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });

  const numFormatter = new Intl.NumberFormat("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });

  function clearFields() {
    cryptoPrice = "";
    document.getElementById("calculatorForm").reset();
  }

  function submitForm(e) {
    e.preventDefault();

    const enteredCalculationType = calculationSelectRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredHoldingAmount = holdingAmountRef.current.value;

    if (
      enteredCalculationType === "" ||
      enteredPrice === "" ||
      enteredHoldingAmount === ""
    ) {
      alert("One or more fields are not filled in!");
      return;
    }

    if (enteredCalculationType === "coin") {
      holdingValue = currencyFormatter.format(
        enteredPrice * enteredHoldingAmount
      );
      setCryptoPrice(holdingValue);
    } else {
      holdingValue = numFormatter.format(enteredHoldingAmount / enteredPrice);
      setCryptoPrice(holdingValue);
    }
  }

  return (
    <div>
      {/* <div className="flex justify-end px-8">
        <Currency onChangeHandler={onChangeHandler} currencies={configData.SUPPORTED_CURRENCIES}/>
      </div> */}
      <form
        className="justify-center items-center flex dark:text-white text-black"
        onSubmit={submitForm}
        id="calculatorForm"
      >
        <div className="mx-auto w-1/2">
          <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h1 className="text-3xl font-semibold">
                {coinName} | Calculator
              </h1>
            </div>
            <div className="relative p-6 flex-auto">
              <div>
                <label htmlFor="type">Type Of Calculation:</label>
                <select
                  className="px-3 py-3 my-2 placeholder-black text-black relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                  id="type"
                  ref={calculationSelectRef}
                >
                  <option value="coin">Coin</option>
                  <option value="fiat" defaultValue>
                    Fiat
                  </option>
                </select>
              </div>
              <div className="mt-3">
                <div className="flex">
                  <div className="flex flex-col flex-1 mr-5">
                    <label className="mb-1" htmlFor="price">
                      Price:
                    </label>
                    <Input
                      type="text"
                      id="price"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      defaultValue={coinPrice}
                      placeholder={currencyFormatter.format(coinPrice)}
                      ref={priceInputRef}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="holdingAmount">
                      Holding Amount:
                    </label>
                    <Input
                      type="number"
                      id="holdingAmount"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      placeholder="Holding Amount"
                      step="any"
                      ref={holdingAmountRef}
                    />
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="holdingValue">
                      Holding Value:
                    </label>
                    <Input
                      type="text"
                      id="holdingValue"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      placeholder="Holding Value"
                      step="any"
                      disabled
                      defaultValue={cryptoPrice !== "" ? cryptoPrice : ""}
                    />
                  </div>
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
                  onClick={history.goBack}
                  className="outline-none mx-2 bg-gray-400 rounded px-6 py-1 text-white"
                />
                <Button
                  text="Calculate"
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

export default Calculator;
