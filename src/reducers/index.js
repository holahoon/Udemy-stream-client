/**
 *  [ Main Reducers ]
 */

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer'
import streamReducer from './streamReducer'

export default combineReducers({
  authReducer,
  streamReducer,
  form: formReducer // <- needs the obj key to be named "form" or it won't work
})