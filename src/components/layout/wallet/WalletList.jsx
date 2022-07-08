import { useState, useEffect } from "react";

import WalletService from "../../../api/services/Wallet";
import Loading from "../../common/Loading";
import WalletListItem from "./WalletListItem";
import WalletVerticalListItem from "./WalletVerticalListItem";

const WalletList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedWallets, setLoadedWallets] = useState([]);

  useEffect(() => {
    WalletService.getInstance()
      .getWallets()
      .then((data) => {
        setIsLoading(false);
        const wallets = [];

        for (const key in data) {
          const wallet = {
            id: key,
            ...data[key],
          };

          wallets.push(wallet);
        }

        setLoadedWallets(wallets);
      });
  }, []);

  function deleteWallet(id) {
    if (window.confirm("Are you sure you want to delete this wallet?")) {
      WalletService.getInstance()
        .deleteWallet(id)
        .then(() => {
          let remainingWallets = loadedWallets.filter((t) => t.id !== id);
          setLoadedWallets(remainingWallets);
        });
    }
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

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-8 overflow-y-auto">
      {windowDimension.winWidth > 700 && (
        <table className="w-full my-5">
          <thead className="dark:bg-gray-700 bg-gray-300">
            <tr className="border-2 dark:border-gray-700 border-gray-300">
              <th>#</th>
              <th>Wallet Name</th>
              <th>Wallet Type</th>
              <th>Wallet URL</th>
              <th>Notes</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {loadedWallets.map((wallet, index) => (
              <WalletListItem
                key={wallet.id}
                index={index}
                data={wallet}
                onDelete={deleteWallet}
              />
            ))}
          </tbody>
        </table>
      )}
      {windowDimension.winWidth <= 700 && (
        <table className="w-full my-5">
          {loadedWallets.map((wallet, index) => (
            <WalletVerticalListItem
              key={wallet.id}
              index={index}
              data={wallet}
              onDelete={deleteWallet}
            />
          ))}
        </table>
      )}
    </div>
  );
};

export default WalletList;
