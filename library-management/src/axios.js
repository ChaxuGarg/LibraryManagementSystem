import axios from "axios";

const instance = axios.create({
  baseURL: "http://library-backend-chaxu.herokuapp.com/",
});

export default instance;
