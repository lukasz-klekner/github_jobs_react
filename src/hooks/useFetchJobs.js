import { useReducer, useEffect } from 'react'
import axios from 'axios'

const BASE_URL =
  'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'

const ACTIONS = {
  makeRequest: 'MAKE_REQUEST',
  getData: 'GET_DATA',
  error: 'ERROR',
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.makeRequest:
      return { ...state, jobs: [], loading: true }
    case ACTIONS.getData:
      return { ...state, jobs: action.payload.jobs, loading: false }
    case ACTIONS.error:
      return { ...state, error: action.payload.error, jobs: [] }
    default:
      return state
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()
    dispatch({ type: ACTIONS.makeRequest })
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.getData, payload: { jobs: res.data } })
      })
      .catch((error) => {
        if (axios.isCancel(error)) return
        dispatch({ type: ACTIONS.error, payload: { error } })
      })

    return () => cancelToken.cancel()
  }, [params, page])

  return state
}
