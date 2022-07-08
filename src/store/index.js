import { createStore } from 'redux';

import configData from '../config.json';

const currencyReducer = (
  state = { currency: configData.DEFAULT_CURRENCY.toLowerCase() },
  action
) => {
  const supportedCurrency = configData.SUPPORTED_CURRENCIES.filter(
    (s) => s.key.toLowerCase() === action.type.toLowerCase()
  );

  if (supportedCurrency.length > 0) {
    return {
      currency: action.type,
    };
  }

  return state;
};
const store = createStore(currencyReducer);

export default store;
