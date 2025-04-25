/**
 * Structure of the "Current User" in the AppStore
 * @typedef {Object} CurrentUser
 * @property {{id: string, uuid: string, name: string, email: string, role: string}} userDetail
 * @property {string} [displayName]
 * @property {string} [avatarUrl]
 * @property {string} [userId]
 * @property {string} [email]
 */

/**
 * Structure of the "Current Page" in the AppStore
 * @typedef {Object} CurrentPage
 * @property {string} pageTitle
 * @property {string} [action]
 * @property {string} [section]
 */

/**
 * Structure of the "AppStore State"
 * @typedef {Object} AppStoreState
 * @property {boolean} isAuthenticated
 * @property {CurrentUser} [currentUser]
 */

/**
 * Initial values of the "State" in the AppStore
 * @type {AppStoreState}
 */
export const INITIAL_APP_STORE_STATE = {
  isAuthenticated: false, // Overridden in AppStore by checking auth token
};
