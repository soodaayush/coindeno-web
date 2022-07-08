import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Refresh from '../components/common/Refresh';
import PortfolioList from '../components/layout/portfolio/PortfolioList';
import TransactionService from '../api/services/Transaction';

const Portfolio = () => {
  const history = useNavigate();
  const [loadedTransactions, setLoadedTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  if (!localStorage.getItem('user_token')) {
    history('/login');
  }

  const selectedCurrency = useSelector(
    (currencyState) => currencyState.currency
  );

  function onRefreshHandler() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    TransactionService.getInstance()
      .getTransactions()
      .then((data) => {
        let transactions = [];

        for (let key in data) {
          let transaction = {
            id: key,
            coinAmount: parseFloat(data[key].coinAmount),
            fiatAmount:
              data[key].fiatAmount !== ''
                ? parseFloat(data[key].fiatAmount)
                : '',
            fee: data[key].fee !== '' ? parseFloat(data[key].fee) : '',
            coinName: data[key].cryptoCurrency,
            currency: data[key].currency,
            exchange: data[key].exchange,
            dateTime: data[key].dateTime,
            transactionType: data[key].transactionType,
          };

          transactions.push(transaction);
        }

        setLoadedTransactions(transactions);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center">
          <h1 className="text-4xl mr-3">Portfolio</h1>
          <Refresh refreshFunction={onRefreshHandler} />
        </div>
      </div>
      {loadedTransactions.length > 0 ? (
        <PortfolioList
          coins={loadedTransactions}
          key={loadedTransactions.id}
          onRefreshHandler={onRefreshHandler}
          refresh={refresh}
          currency={selectedCurrency}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Portfolio;
