import { Component } from "react";
import configData from "../../config.json";

export class FavouriteService extends Component {
  static myInstance = null;

  static getInstance() {
    return new FavouriteService();
  }

  async getFavourites() {
    try {
      let user = localStorage.getItem("user_token");

      let url = `${configData.BASE_URL}/${user}/favourites.json`;

      let response = await fetch(url);

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async createFavourite(transactionData) {
    let user = localStorage.getItem("user_token");

    let url = `${configData.BASE_URL}/${user}/favourites.json`;

    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(transactionData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }

  async deleteFavourite(id) {
    let user = localStorage.getItem("user_token");

    let url = `${configData.BASE_URL}/${user}/favourites/${id}.json`;

    return await fetch(url, {
      method: "DELETE",
    });
  }
}

export default FavouriteService;
