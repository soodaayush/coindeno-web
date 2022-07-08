import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CoinService from "../api/services/Coin";
import TransactionService from "../api/services/Transaction";
import WalletService from "../api/services/Wallet";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

const AddTransaction = (props) => {
  const history = useNavigate();

  if (!localStorage.getItem("user_token")) {
    history("/login");
  }

  const location = useLocation();

  let edit;
  let data;

  if (location.state === undefined || location.state === null) {
    edit = false;
    data = "";
  } else {
    edit = true;
    data = location.state.data;
  }

  const [coinNameData, setCoinNameData] = useState([]);
  const [exchangeData, setExchangeData] = useState([]);
  const [walletNameData, setWalletNameData] = useState([]);

  const selectInputRef = useRef();
  const coinInputRef = useRef();
  const fiatInputRef = useRef();
  const currencyInputRef = useRef();
  const exchangeInputRef = useRef();
  const feeInputRef = useRef();
  const dateTimeInputRef = useRef();
  const cryptoCurrencyInputRef = useRef();
  const notesInputRef = useRef();
  const walletInputRef = useRef();

  useEffect(() => {
    if (selectInputRef.current) {
      selectInputRef.current.focus();
    }
  }, []);

  function submitForm(event) {
    event.preventDefault();

    const enteredTransactionType = selectInputRef.current.value;
    const enteredCoinAmount = coinInputRef.current.value;
    const enteredFiatAmount = fiatInputRef.current.value;
    const enteredCurrency = currencyInputRef.current.value;
    const enteredExchange = exchangeInputRef.current.value;
    const enteredFee = feeInputRef.current.value;
    const enteredDateTime = dateTimeInputRef.current.value;
    const enteredCryptoCurrency = cryptoCurrencyInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;
    const enteredWallet = walletInputRef.current.value;

    if (
      enteredCoinAmount === "" ||
      enteredCryptoCurrency === "" ||
      enteredDateTime === ""
    ) {
      alert("One or more fields have not been filled!");
      return;
    }

    const transaction = {
      transactionType: enteredTransactionType,
      coinAmount: enteredCoinAmount,
      fiatAmount: enteredFiatAmount,
      currency: enteredCurrency,
      exchange: enteredExchange,
      fee: enteredFee,
      dateTime: enteredDateTime,
      cryptoCurrency: enteredCryptoCurrency,
      notes: enteredNotes,
      wallet: enteredWallet,
    };

    if (edit === false) {
      TransactionService.getInstance()
        .createTransaction(transaction)
        .then(() => {
          history("/transactions");
        });
    } else {
      TransactionService.getInstance()
        .editTransaction(transaction, data.id)
        .then(() => {
          history("/transactions");
        });
    }
  }

  useEffect(() => {
    CoinService.getInstance()
      .getExchangesList()
      .then((coingeckoExchanges) => {
        let canadianExchanges =
          CoinService.getInstance().getCanadianExchangesList();

        const fullExchangeList = [...coingeckoExchanges, ...canadianExchanges];

        if (fullExchangeList !== undefined)
          fullExchangeList.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          );

        setExchangeData(fullExchangeList);
      });
  }, []);

  useEffect(() => {
    CoinService.getInstance()
      .getCoinsList()
      .then((data) => {
        if (data) {
          data.sort((a, b) =>
            a.symbol.toLowerCase() > b.symbol.toLowerCase() ? 1 : -1
          );
        }

        setCoinNameData(data);
      });
  }, []);

  useEffect(() => {
    WalletService.getInstance()
      .getWallets()
      .then((data) => {
        const walletNames = [];

        for (const key in data) {
          const walletName = {
            id: key,
            ...data[key],
          };

          walletNames.push(walletName);
        }

        setWalletNameData(walletNames);
      });
  }, []);

  function goBackToTransactionsPage() {
    history("/transactions");
  }

  return (
    <div className="min-h-screen">
      <form className="justify-center items-center flex" onSubmit={submitForm}>
        <div className="mx-auto w-1/2">
          <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              {edit === false ? (
                <h3 className="text-3xl font-semibold">Add Transaction</h3>
              ) : (
                <h3 className="text-3xl font-semibold">Edit Transaction</h3>
              )}
            </div>
            <div className="relative p-6 flex-auto">
              <div>
                <label htmlFor="type">Type Of Transaction:</label>
                <select
                  className="px-3 py-3 my-2 placeholder-black text-black relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                  id="type"
                  ref={selectInputRef}
                >
                  {data.transactionType !== "" && (
                    <option value={data.transactionType} defaultValue>
                      {data.transactionType}
                    </option>
                  )}
                  <option value="Buying" defaultValue>
                    Buying
                  </option>
                  <option value="Crowdloan">Crowdloan Rewards</option>
                  <option value="Mined">Mined</option>
                  <option value="Selling">Selling</option>
                  <option value="Staking">Staking</option>
                  <option value="Earning">Earning</option>
                </select>
              </div>
              <div className="mt-1">
                <div className="flex">
                  <div className="flex flex-col flex-1 mr-5">
                    <label className="mb-1" htmlFor="exchange">
                      Exchange:
                    </label>
                    <select
                      className="px-3 py-3 placeholder-black text-black rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      id="exchange"
                      ref={exchangeInputRef}
                    >
                      {data.exchange !== "" && (
                        <option defaultValue value={data.exchange}>
                          {data.exchange}
                        </option>
                      )}
                      <option value="Other">Other</option>
                      <option value="None">None</option>
                      {exchangeData.map((exchange) => (
                        <option value={exchange.id} key={exchange.id}>
                          {exchange.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="cryptocurrency">
                      Cryptocurrency:
                    </label>
                    <select
                      className="px-3 py-3 placeholder-black text-black rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      id="cryptoCurrency"
                      ref={cryptoCurrencyInputRef}
                    >
                      {data.cryptoCurrency !== "" ? (
                        <option defaultValue value={data.cryptoCurrency}>
                          {data.cryptoCurrency}
                        </option>
                      ) : (
                        <option value=""></option>
                      )}
                      {coinNameData.map((coinName) => (
                        <option value={coinName.id} key={coinName.id}>
                          {coinName.symbol} ({coinName.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="flex flex-col flex-1 mr-5">
                    <label className="mb-1" htmlFor="coinAmount">
                      Coin Amount:
                    </label>
                    <Input
                      type="number"
                      id="coinAmount"
                      placeholder="Coin Amount"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      defaultValue={
                        data.coinAmount !== "" ? data.coinAmount : ""
                      }
                      step="any"
                      ref={coinInputRef}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="fee">
                      Fee:
                    </label>
                    <Input
                      type="number"
                      placeholder="Fee"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      defaultValue={data.fee ? data.fee : 0}
                      id="fee"
                      step="any"
                      ref={feeInputRef}
                    />
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="flex flex-col flex-1 mr-5">
                    <label className="mb-1" htmlFor="currency">
                      Currency:
                    </label>
                    <select
                      className="px-3 py-3 placeholder-black text-black relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      id="currency"
                      ref={currencyInputRef}
                    >
                      {data.currency !== "" && (
                        <option defaultValue value={data.currency}>
                          {data.currency}
                        </option>
                      )}
                      <option value="NA">Not Applicable</option>
                      <option value="CAD" defaultValue>
                        CAD
                      </option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="fiatAmount">
                      Fiat Amount:
                    </label>
                    <Input
                      type="number"
                      placeholder="Fiat Amount"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      defaultValue={data.fiatAmount ? data.fiatAmount : 0}
                      id="fiatAmount"
                      step="any"
                      ref={fiatInputRef}
                    />
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="flex flex-col flex-1 mr-5">
                    <label className="mb-1" htmlFor="dateTime">
                      Date & Time:
                    </label>
                    <Input
                      type="datetime-local"
                      id="dateTime"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      ref={dateTimeInputRef}
                      defaultValue={data.dateTime !== "" ? data.dateTime : ""}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="wallet">
                      Wallet:
                    </label>
                    <select
                      className="px-3 py-3 placeholder-black text-black rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      id="wallet"
                      ref={walletInputRef}
                    >
                      {data.wallet !== "" ? (
                        <option defaultValue value={data.wallet}>
                          {data.wallet}
                        </option>
                      ) : (
                        <option value=""></option>
                      )}
                      {walletNameData.map((walletName) => (
                        <option
                          value={walletName.walletName}
                          key={walletName.id}
                        >
                          {walletName.walletName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="notes">
                      Notes:
                    </label>
                    <textarea
                      className="resize-none px-3 py-3 text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      id="notes"
                      cols="30"
                      rows="5"
                      ref={notesInputRef}
                      defaultValue={data.notes !== "" ? data.notes : ""}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <Button
                text="Back"
                type="button"
                onClick={goBackToTransactionsPage}
                className="outline-none mx-2 bg-gray-400 rounded px-6 py-1 text-white"
              />
              {edit === false ? (
                <Button
                  text="Add"
                  type="submit"
                  className="outline-none mx-2 bg-green-900 rounded px-6 py-1 text-white"
                />
              ) : (
                <Button
                  text="Save"
                  type="submit"
                  className="outline-none mx-2 bg-green-900 rounded px-6 py-1 text-white"
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
