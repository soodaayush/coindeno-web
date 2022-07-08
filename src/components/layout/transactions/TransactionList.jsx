import { useState, useEffect } from "react";

import TransactionService from "../../../api/services/Transaction";
import Loading from "../../common/Loading";
import TransactionListItem from "./TransactionListItem";
import TransactionVerticalListItem from "./TransactionVerticalListItem";

const TransactionList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedTransactions, setLoadedTransactions] = useState([]);

  useEffect(() => {
    TransactionService.getInstance()
      .getTransactions()
      .then((data) => {
        setIsLoading(false);

        const transactions = [];

        for (const key in data) {
          const transaction = {
            id: key,
            ...data[key],
          };

          transactions.push(transaction);
        }

        transactions.sort((a, b) =>
          new Date(a.dateTime).getTime() > new Date(b.dateTime).getTime()
            ? -1
            : 1
        );

        setLoadedTransactions(transactions);
      });
  }, []);

  function deleteTransaction(id) {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      TransactionService.getInstance()
        .deleteTransaction(id)
        .then(() => {
          let remainingTransactions = loadedTransactions.filter(
            (t) => t.id !== id
          );
          setLoadedTransactions(remainingTransactions);
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
      {windowDimension.winWidth > 1200 && (
        <table className="w-full my-5">
          <thead className="dark:bg-gray-700 bg-gray-300">
            <tr className="dark:border-gray-700 border-gray-300 border-2">
              <th>#</th>
              <th>Transaction Type</th>
              <th>Name</th>
              <th>Coin Amount</th>
              <th>Fiat Amount</th>
              <th>Currency</th>
              <th>Exchange</th>
              <th>Fee</th>
              <th>Date & Time</th>
              <th>Wallet</th>
              <th>Notes</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {loadedTransactions.map((transaction, index) => (
              <TransactionListItem
                key={transaction.id}
                index={index}
                data={transaction}
                onDelete={deleteTransaction}
              />
            ))}
          </tbody>
        </table>
      )}
      {windowDimension.winWidth <= 1200 && (
        <table className="w-full my-5">
          {loadedTransactions.map((transaction, index) => (
            <TransactionVerticalListItem
              key={transaction.id}
              index={index}
              data={transaction}
              onDelete={deleteTransaction}
            />
          ))}
        </table>
      )}
    </div>
  );
};

export default TransactionList;
