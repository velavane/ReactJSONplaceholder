import axios from "axios";

export default axios.create({
  // baseURL: "https://my-json-server.typicode.com/velavane/myJSONdb",
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-type": "application/json"
  }
});