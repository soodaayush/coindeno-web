import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Add from "../components/common/Add";
import TransactionList from "../components/layout/transactions/TransactionList";

const Transactions = (props) => {
  const history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_token")) {
      history("/login");
    }
  }, []);

  function AddTransaction() {
    history("/addTransaction");
  }

  return (
    <div>
      <div className="flex px-8 items-center">
        <h1 className="text-4xl">Transactions</h1>
        <Add addFunction={AddTransaction} title="Add Transaction" />
      </div>
      <TransactionList />
      <br />
    </div>
  );
};

export default Transactions;
