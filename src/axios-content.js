import axios from 'axios';
import Config from "./services/ConfigService";

const conf = new Config(document.cookiesjsr);
const instance = axios.create({
  baseURL: conf.get('apiUrl', '/')
});

export default instance;
