import axios from "axios";

const instance = axios.create({
  baseURL: "https://library-backend-chaxu.herokuapp.com/",
});

export default instance;
