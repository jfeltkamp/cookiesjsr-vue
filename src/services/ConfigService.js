/* eslint-disable */
import { drupalSettings } from "@/services/DrupalService";

class ConfigService {
  // Set initial configuration
  constructor(config) {
    config = (typeof config === 'object') ? config : {};
    this.config = config;
  }

  /**
   * Type checked getter for config settings.
   * Returns also nested config properties, if name is an object path
   * e.g. "config.cookie.name".
   *
   * @param name {string}
   *   Name or object query path of config.
   *
   * @param fallback {*}
   *   Fallback to return if no config found or if type of return value
   *   differs from type of fallback.
   *
   * @returns {*}
   *   Returns requested config or null.
   *   If fallback IS defined and requested config IS NOT defined, method returns
   *   fallback.
   *   If requested config AND fallback IS defined, the data types of both must be equal
   *   => if EQUAL method returns requested config, if NOT EQUAL returns fallback.
   *   false or fallback if fallback is set as param.
   */
  get = (name, fallback = null) => {
    if (name === '') {
      return this.config;
    }
    let returnValue;
    switch (typeof this.config[name]) {
      case 'string':
      case 'object':
      case 'number':
      case 'boolean':
        returnValue = this.config[name];
        break;
      default:
        let frag = this.resolve(name);
        returnValue = (typeof frag !== 'undefined') ? frag : fallback;
    }
    return (
        (fallback === null) ||
        (returnValue === fallback) ||
        (typeof returnValue === typeof fallback)
    ) ? returnValue : fallback;
  }

  /**
   * Resolves nested properties in config object.
   *
   * @param path {string}
   * @param separator {string}
   *
   * @returns {*}
   *   Resolved content of string query.
   */
  resolve = (path, separator='.') => {
    // console.log('#ConfigService::resolve', path)
    let properties = path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], this.config)
  }
}

const CS = new ConfigService(drupalSettings);

export default CS;
