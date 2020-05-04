/**
 *  [ Main Action Creators ]
 */

import streamsAxios from '../apis/streamsAxios'
import history from '../history'
import * as actions from './types'


const { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } = actions

// - Sign in
export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  }
}

// - Sign out
export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

// - Create stream 
export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().authReducer // getState() allows to reach into the redux store and pull out some infos
  const response = await streamsAxios.post('/streams', { ...formValues, userId })

  dispatch({
    type: CREATE_STREAM,
    payload: response.data
  })
  // Programmatic navigation using custom history object (see - history.js file)
  history.push('/') // navigate the user to the path that's passed in as string
}

// - Fetch streams
export const fetchStreams = () => async dispatch => {
  const response = await streamsAxios.get('/streams')

  dispatch({
    type: FETCH_STREAMS,
    payload: response.data
  })
}

// - Fetch stream with ID
export const fetchStream = id => async dispatch => {
  const response = await streamsAxios.get(`/streams/${id}`)

  dispatch({
    type: FETCH_STREAM,
    payload: response.data
  })
}

// - Edit stream (update) with ID and update
export const editStream = (id, formValues) => async dispatch => {
  // ** .put() - updates ALL properties of a record **
  // const response = await streamsAxios.put(`/streams/${id}`, formValues)

  // ** .patch() - updates SOME properties of a record **
  const response = await streamsAxios.patch(`/streams/${id}`, formValues)

  dispatch({
    type: EDIT_STREAM,
    payload: response.data
  })
  history.push('/') // navigate the user to the path that's passed in as string
}

// - Delete stream with ID
export const deleteStream = id => async dispatch => {
  await streamsAxios.delete(`/streams/${id}`)

  dispatch({
    type: DELETE_STREAM,
    payload: id
  })
  history.push('/')
}
