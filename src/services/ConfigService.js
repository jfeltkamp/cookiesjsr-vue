/* eslint-disable */
import { drupalSettings } from "@/services/DrupalService";

class ConfigService {
  // Set initial configuration
  constructor(config) {
    config = (typeof config === 'object') ? config : {};
    this.config = config;
  }

  /**
   * Getter for all config items.
   *
   * @param name {string}
   *   Name or object query path of config.
   *
   * @param fallback {*}
   *   Fallback to return if no config found.
   *
   * @returns {*}
   *   Returns config[name], false or fallback if fallback is set as param.
   */
  get = (name, fallback) => {
    switch (typeof this.config[name]) {
      case 'string':
      case 'object':
        return this.config[name];
      default:
        fallback = (typeof fallback !== 'undefined') ? fallback : false;
        let frag = this.resolve(name);
        return (typeof frag !== 'undefined') ? frag : fallback;
    }
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
    let properties = path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], this.config)
  }
}

export default ConfigService;
