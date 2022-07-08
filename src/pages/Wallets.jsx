import { useNavigate } from "react-router-dom";

import Add from "../components/common/Add";
import WalletList from "../components/layout/wallet/WalletList";

const Wallets = () => {
  const history = useNavigate();

  if (!localStorage.getItem("user_token")) {
    history("/login");
  }

  function redirectToAddWalletPage() {
    history("/addWallet");
  }

  return (
    <div>
      <div className="flex px-8 items-center">
        <h1 className="text-4xl">Wallets</h1>
        <Add title="Add Wallet" addFunction={redirectToAddWalletPage} />
      </div>
      <WalletList />
    </div>
  );
};

export default Wallets;
