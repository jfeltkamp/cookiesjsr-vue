/* eslint-disable */
import { drupalSettings } from "@/services/DrupalService";
import axios from '../axios-content';

class CookieService {

  constructor() {
    const config = drupalSettings.config;
    this.cookieName = config.name;
    this.expires = (typeof config.expires !== 'undefined')
      ? parseInt(config.expires, 10) : 2592000000; // 30*24*60*60=2592000 = 1 month
    this.secure = (typeof config.secure === 'boolean' && config.secure) ? "; Secure=true" : "";
    this.sameSite = (typeof config.sameSite === 'string' && config.sameSite)
      ? "; SameSite=" + config.sameSite : "; SameSite=None";
    this.domain = (typeof config.domain === 'string' && config.domain) ? " domain=" + config.domain + ';' : "";
    this.callback = (typeof config.callback === 'object') ? config.callback : {};
  }

  /**
   * Fires the event on document where other Javascript can listen to.
   *
   * @param services
   */
  fireEvent(services) {
    let options = {
      bubbles: false,
      detail: {
        services: services
      }
    }
    document.dispatchEvent(new CustomEvent('cookiesjsrUserConsent', options))
  }


  /**
   * Get raw cookie value.
   *
   * @returns {string}
   *   Raw cookie value.
   */
  getCookie() {
    let b = document.cookie.match('(^|[^;]+)\\s*' + this.cookieName + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '{}';
  }

  /**
   * Set cookie.
   *
   * @param services object
   *   The cookie value to set.
   */
  setCookie(services) {
    if (typeof services !== 'object') {
      return false;
    }
    let serviceString = encodeURI(JSON.stringify(services));
    let cookie = this.cookieName + '=' + serviceString;

    let date = new Date();
    let time = date.getTime();
    let expireTime = time + this.expires;
    date.setTime(expireTime);

    document.cookie = cookie + '; expires=' + date.toUTCString() + this.secure
      + this.sameSite + '; path=/;' + this.domain;
  }

  /**
   * Get services from cookie.
   *
   * @returns {*}
   *   Returns services with activation status.
   */
  getServices() {
    let raw = this.getCookie();
    return JSON.parse(decodeURI(raw));
  }

  /**
   *
   * @param services {object}
   *   Services with their activation setting.
   */
  setServices(services) {
    this.setCookie(services);
    this.fireEvent(services);
    this.sendCallback(services);
  }

  /**
   * Send a backend callback with user consent, to save in session.
   *
   * @param services {object}
   *   Services with their activation setting.
   */
  sendCallback(services) {
    let method = (typeof this.callback.method !== 'undefined')
      ? this.callback.method.toUpperCase() : 'GET';
    if (typeof this.callback.url === 'string') {
      const url = this.callback.url;
      const headers = (typeof this.callback.header === 'object') ? this.callback.header : {};

      if (method === 'GET') {
        axios.get(url, {params: services}).catch(err => { console.log(err); });
      } else {
        axios({
          method: method,
          headers: headers,
          data: services,
          url,
        }).catch( err => { console.log(err); });
      }

    }
  }

  /**
   * Get a list of active services to be compared with service config
   * from cookie.
   *
   * @param activeServicesIds {array}
   *
   * @return {object}
   */
  getActiveServices(activeServicesIds) {
    let active = {
      updateRequired: false,
      services: {}
    };
    let cServices = this.getServices();
    for (let id of activeServicesIds) {
      if (typeof cServices[id] === 'undefined') {
        active.services[id] = false;
        active.updateRequired = true;
      } else {
        active.services[id] = cServices[id];
      }
    }
    return active;
  }
}

const CS = new CookieService();
export default CS;

