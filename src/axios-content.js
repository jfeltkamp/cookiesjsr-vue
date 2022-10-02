import axios from 'axios';
import configService from "./services/ConfigService";

const instance = axios.create({
  baseURL: configService.get('apiUrl', '/')
});

export default instance;
