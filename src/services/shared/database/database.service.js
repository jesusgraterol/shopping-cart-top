/**
 * Database Service
 * Service in charge of handling interactions with the Database. This implementation is based on:
 * - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * - https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */
class Database {
  /**
   * Reads a value from the database based on given key.
   * @param {*} key 
   * @returns object|undefined
   */
  static read(key) {
    try {
      const data = localStorage.getItem(key);
      return typeof data === 'string' ? JSON.parse(data) : undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  /**
   * Writes an object into the database.
   * @param {*} key 
   * @param {*} value 
   */
  static write(key, value) {
    try {
      if (!value || typeof value !== 'object') {
        throw new Error(`Only object data types can be written into the Database. Received: ${typeof value}`);
      }
      localStorage.setItem(key, JSON.stringify(value)) 
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Deletes a record from the database for a given key.
   * @param {*} key 
   */
  static delete(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }
}




/**
 * Module Exports
 */
export default Database;
