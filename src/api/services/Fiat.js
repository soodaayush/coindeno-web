import { Component } from 'react';
//import { GetHash } from './../../utils/Common';

import configData from '../../config.json';

export class FiatService extends Component {
  static myInstance = null;

  static getInstance() {
    return new FiatService();
  }

  async getFiats() {
    try {
      let user = localStorage.getItem('user_token');
      //user = GetHash(user);

      let url = `${configData.BASE_URL}/${user}/fiats.json`;

      let response = await fetch(url);

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async createFiat(transactionData) {
    let user = localStorage.getItem('user_token');
    //user = GetHash(user);

    let url = `${configData.BASE_URL}/${user}/fiats.json`;

    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(transactionData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async deleteFiat(id) {
    let user = localStorage.getItem('user_token');
    //user = GetHash(user);

    let url = `${configData.BASE_URL}/${user}/fiats/${id}.json`;

    return await fetch(url, {
      method: 'DELETE',
    });
  }

  async editFiat(transaction, id) {
    let user = localStorage.getItem('user_token');
    user = user.replace(/[^a-zA-Z0-9]/g, '');

    let url = `${configData.BASE_URL}/${user}/fiats/${id}.json`;

    return await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(transaction),
    });
  }

  getCanadianBanksList() {
    let exchanges = [
      {
        id: 'ScotiaBank',
        name: 'ScotiaBank',
      },
      {
        id: 'CIBC',
        name: 'CIBC',
      },
      {
        id: 'BMO',
        name: 'BMO',
      },
      {
        id: 'RBC',
        name: 'RBC',
      },
      {
        id: 'TD',
        name: 'TD',
      },
    ];
    return exchanges;
  }
}

export default FiatService;
