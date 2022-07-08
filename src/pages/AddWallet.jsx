import { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import WalletService from "../api/services/Wallet";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

const AddWallet = (props) => {
  const history = useNavigate();

  if (!localStorage.getItem("user_token")) {
    history("/login");
  }

  const location = useLocation();

  let edit;
  let data;

  console.log(location);

  if (location.state === undefined || location.state === null) {
    edit = false;
    data = "";
    console.log(data);
  } else {
    edit = true;
    data = location.state.data;
  }

  console.log(location);

  const walletNameInputRef = useRef();
  const walletTypeSelectRef = useRef();
  const walletUrlInputRef = useRef();
  const notesInputRef = useRef();

  useEffect(() => {
    if (walletNameInputRef.current) {
      walletNameInputRef.current.focus();
    }
  }, []);

  function submitForm(event) {
    event.preventDefault();

    const enteredWalletName = walletNameInputRef.current.value;
    const enteredWalletType = walletTypeSelectRef.current.value;
    const enteredWalletUrl = walletUrlInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;

    if (enteredWalletName === "" || enteredWalletType === "") {
      alert("One or more fields have not been filled!");
      return;
    }

    const wallet = {
      walletName: enteredWalletName,
      walletType: enteredWalletType,
      walletUrl: enteredWalletUrl,
      notes: enteredNotes,
    };

    if (edit === false) {
      WalletService.getInstance()
        .createWallet(wallet)
        .then(() => {
          history("/wallets");
        });
    } else {
      WalletService.getInstance()
        .editWallet(wallet, data.id)
        .then(() => {
          history("/wallets");
        });
    }
  }

  function goBackToWalletsPage() {
    history("/wallets");
  }

  return (
    <div className="min-h-screen">
      <form className="justify-center items-center flex" onSubmit={submitForm}>
        <div className="mx-auto w-1/2">
          <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              {edit === false ? (
                <h3 className="text-3xl font-semibold">Add Wallet</h3>
              ) : (
                <h3 className="text-3xl font-semibold">Edit Wallet</h3>
              )}
            </div>
            <div className="relative p-6 flex-auto">
              <div className="mt-1">
                <div className="flex">
                  <div className="flex flex-col flex-1 mr-5">
                    <label className="mb-1" htmlFor="exchange">
                      Wallet Name:
                    </label>
                    <Input
                      type="text"
                      placeholder="Wallet Name"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      ref={walletNameInputRef}
                      defaultValue={
                        data.walletName !== "" ? data.walletName : ""
                      }
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="mb-1" htmlFor="exchange">
                      Wallet Type:
                    </label>
                    <select
                      ref={walletTypeSelectRef}
                      className="px-3 py-3 placeholder-black text-black rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    >
                      <option value="Software Wallet" defaultValue>
                        Software Wallet
                      </option>
                      <option value="Hardware Wallet">Hardware Wallet</option>
                      <option value="Custodial Wallet">Custodial Wallet</option>
                    </select>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col flex-1 mt-3">
                    <label className="mb-1" htmlFor="cryptocurrency">
                      Wallet URL:
                    </label>
                    <Input
                      type="text"
                      placeholder="Wallet URL"
                      className="px-3 py-3 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      ref={walletUrlInputRef}
                      defaultValue={data.walletUrl !== "" ? data.walletUrl : ""}
                    />
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
                onClick={goBackToWalletsPage}
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

export default AddWallet;
