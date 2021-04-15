import axios from "axios";

const instance = axios.create({
  baseURL: "https://managementsystem2021.herokuapp.com/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  },
});

export default instance;
