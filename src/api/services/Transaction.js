import { Component } from "react";
import configData from "../../config.json";

export class TransactionService extends Component {
  static myInstance = null;

  static getInstance() {
    return new TransactionService();
  }

  async getTransactions() {
    try {
      let user = localStorage.getItem("user_token");

      let url = `${configData.BASE_URL}/${user}/transactions.json`;

      let response = await fetch(url);

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async createTransaction(transactionData) {
    let user = localStorage.getItem("user_token");

    let url = `${configData.BASE_URL}/${user}/transactions.json`;

    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(transactionData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async deleteTransaction(id) {
    let user = localStorage.getItem("user_token");

    let url = `${configData.BASE_URL}/${user}/transactions/${id}.json`;

    return await fetch(url, {
      method: "DELETE",
    });
  }

  async editTransaction(transaction, id) {
    let user = localStorage.getItem("user_token");

    let url = `${configData.BASE_URL}/${user}/transactions/${id}.json`;

    return await fetch(url, {
      method: "PUT",
      body: JSON.stringify(transaction),
    });
  }
}

export default TransactionService;
