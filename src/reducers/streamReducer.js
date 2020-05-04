/**
 *  [ Stream Reducer ]
 */

import _ from 'lodash'
import * as actions from '../actions/types'

const { FETCH_STREAMS, FETCH_STREAM, CREATE_STREAM, EDIT_STREAM, DELETE_STREAM } = actions

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      }

    case FETCH_STREAM:
      return {
        ...state,
        [action.payload.id]: action.payload
      }

    case CREATE_STREAM:
      return {
        ...state,
        [action.payload.id]: action.payload
      }

    case EDIT_STREAM:
      return {
        ...state,
        [action.payload.id]: action.payload
      }

    case DELETE_STREAM:
      return _.omit(state, action.payload) // lodash omit does not mutate - returns a new obj

    default:
      return state
  }
}