import { Component } from 'react';
export class CoinService extends Component {
  static myInstance = null;

  static getInstance() {
    return new CoinService();
  }

  async getCoins(currency, page, perPage) {
    try {
      let response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
      );

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async getCoinsList() {
    try {
      let response = await fetch(`https://api.coingecko.com/api/v3/coins/list`);

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async getCoinData(coin) {
    try {
      let response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}`
      );

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async consolidateCoinData(coinList) {
    const results = Promise.all(
      coinList.map((a) => {
        return this.getCoinData(a);
      })
    );

    return results;
  }

  async getExchanges() {
    try {
      let response = await fetch(`https://api.coingecko.com/api/v3/exchanges`);

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async getExchangesList() {
    try {
      let response = await fetch(
        `https://api.coingecko.com/api/v3/exchanges/list`
      );

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  getCanadianExchangesList() {
    let exchanges = [
      {
        id: 'Newton',
        name: 'Newton',
      },
      {
        id: 'NDAX',
        name: 'NDAX',
      },
      {
        id: 'Shakepay',
        name: 'Shakepay',
      },
    ];

    return exchanges;
  }

  async getPriceData(coins, currency) {
    try {
      let response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=${currency}`
      );

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
}

export default CoinService;
