import { Component } from 'react';
//import { GetHash } from './../../utils/Common';

import configData from '../../config.json';

export class WalletService extends Component {
  static myInstance = null;

  static getInstance() {
    return new WalletService();
  }

  async getWallets() {
    try {
      let user = localStorage.getItem('user_token');
      //user = GetHash(user);

      let url = `${configData.BASE_URL}/${user}/wallets.json`;
      let response = await fetch(url);

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async createWallet(transactionData) {
    let user = localStorage.getItem('user_token');
    //user = GetHash(user);

    let url = `${configData.BASE_URL}/${user}/wallets.json`;

    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(transactionData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async deleteWallet(id) {
    let user = localStorage.getItem('user_token');
    //user = GetHash(user);

    let url = `${configData.BASE_URL}/${user}/wallets/${id}.json`;

    return await fetch(url, {
      method: 'DELETE',
    });
  }

  async editWallet(transaction, id) {
    let user = localStorage.getItem('user_token');
    //user = GetHash(user);

    let url = `${configData.BASE_URL}/${user}/wallets/${id}.json`;

    return await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(transaction),
    });
  }
}

export default WalletService;
