import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import FiatService from "../api/services/Fiat";
import CoinService from "../api/services/Coin";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

const AddFiat = (props) => {
  const history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_token")) {
      history("/login");
    }
  }, []);

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

  const [canadianBankNames, setCanadianBankNames] = useState([]);
  const [exchanges, setExchanges] = useState([]);

  const fromInputRef = useRef();
  const toInputRef = useRef();
  const amountInputRef = useRef();
  const statusInputRef = useRef();
  const dateTimeInputRef = useRef();
  const referenceInputRef = useRef();
  const currencyInputRef = useRef();
  const notesInputRef = useRef();

  useEffect(() => {
    if (fromInputRef.current) {
      fromInputRef.current.focus();
    }
  }, []);

  function submitForm(event) {
    event.preventDefault();

    const enteredFrom = fromInputRef.current.value;
    const enteredTo = toInputRef.current.value;
    const enteredAmount = amountInputRef.current.value;
    const enteredStatus = statusInputRef.current.value;
    const enteredDateTime = dateTimeInputRef.current.value;
    const enteredReference = referenceInputRef.current.value;
    const enteredCurrency = currencyInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;

    if (
      enteredFrom === "" ||
      enteredTo === "" ||
      enteredAmount === "" ||
      enteredDateTime === "" ||
      enteredCurrency === ""
    ) {
      alert("One or more fields have not been filled!");
      return;
    }

    const Fiat = {
      from: enteredFrom,
      to: enteredTo,
      amount: enteredAmount,
      status: enteredStatus,
      dateTime: enteredDateTime,
      reference: enteredReference,
      currency: enteredCurrency,
      notes: enteredNotes,
    };

    if (edit === false) {
      FiatService.getInstance()
        .createFiat(Fiat)
        .then(() => {
          history("/fiats");
        });
    } else {
      FiatService.getInstance()
        .editFiat(Fiat, data.id)
        .then(() => {
          history("/fiats");
        });
    }
  }

  // function sendBackToFiatsPage() {
  //   history('/fiats');
  // }

  useEffect(() => {
    let canadianBanks = FiatService.getInstance().getCanadianBanksList();

    setCanadianBankNames(canadianBanks);
  }, []);

  useEffect(() => {
    CoinService.getInstance()
      .getExchanges()
      .then((data) => {
        let canadianExchanges =
          CoinService.getInstance().getCanadianExchangesList();

        const fullExchangeList = [...data, ...canadianExchanges];

        if (fullExchangeList)
          fullExchangeList.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          );

        setExchanges(fullExchangeList);
      });
  }, []);

  function goBackToFiatsPage() {
    history("/fiats");
  }

  return (
    <div className="min-h-screen">
      <form className="justify-center items-center flex" onSubmit={submitForm}>
        <div className="mx-auto w-1/2">
          <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              {edit === false ? (
                <h3 className="text-3xl font-semibold">Add Fiat</h3>
              ) : (
                <h3 className="text-3xl font-semibold">Edit Fiat</h3>
              )}
            </div>
            <div className="relative p-6 flex-auto">
              <div className="mt-1">
                <div className="flex">
                  <div className="flex flex-col flex-1 mr-5">
                    <label className="mb-1" htmlFor="exchange">
                      From:
                    </label>
                    <select
                      ref={fromInputRef}
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    >
                      {data.from !== "" && (
                        <option defaultValue value={data.from}>
                          {data.from}
                        </option>
                      )}
                      {canadianBankNames.map((bank) => (
                        <option key={bank.name} value={bank.name}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="exchange">
                      To:
                    </label>
                    <select
                      ref={toInputRef}
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    >
                      {data.to !== "" && (
                        <option defaultValue value={data.to}>
                          {data.to}
                        </option>
                      )}
                      {exchanges.map((exchange) => (
                        <option key={exchange.name} value={exchange.name}>
                          {exchange.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="flex flex-col flex-1 mr-5">
                    <label className="mb-1" htmlFor="exchange">
                      Amount:
                    </label>
                    <Input
                      type="text"
                      placeholder="Amount"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      ref={amountInputRef}
                      defaultValue={data.amount !== "" ? data.amount : ""}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="exchange">
                      Status:
                    </label>
                    <Input
                      type="text"
                      placeholder="Status"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      ref={statusInputRef}
                      defaultValue={data.status !== "" ? data.status : ""}
                    />
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="flex flex-col flex-1 mr-5">
                    <label className="mb-1" htmlFor="exchange">
                      Date & Time:
                    </label>
                    <Input
                      type="datetime-local"
                      placeholder="Amount"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      ref={dateTimeInputRef}
                      defaultValue={data.dateTime !== "" ? data.dateTime : ""}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="exchange">
                      Reference:
                    </label>
                    <Input
                      type="text"
                      placeholder="Reference"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      ref={referenceInputRef}
                      defaultValue={data.reference !== "" ? data.reference : ""}
                    />
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="exchange">
                      Currency:
                    </label>
                    <select
                      ref={currencyInputRef}
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    >
                      {data.currency !== "" && (
                        <option defaultValue value={data.currency}>
                          {data.currency}
                        </option>
                      )}
                      <option value="CAD" defaultValue>
                        CAD
                      </option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
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
                onClick={goBackToFiatsPage}
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

export default AddFiat;
