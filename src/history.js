/**
 *  - [ Custom History Object ] -
 * createBrowserHistory is a function that can be called to create a new history object.
 * Then need to create a plain "Router" instead of "browserRouter" to allow this to take over the default browserRouter history object (in App.js).
 * This is useful when you want to create a programmatic navigation to allow user to navigate under certain conditions.
 */

import { createBrowserHistory } from 'history'

export default createBrowserHistory()