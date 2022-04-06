import * as types from '../actions/index'

const AuthReduce = (state = { isLoading: false }, action: any) => {
  switch (action.type) {
    case types.REGISTER:
      return { ...state, isLoading: true, error:undefined }
    case types.REGISTER_RECEIVED:
      return { ...state, data: action.data, isLoading: false }
    case types.REGISTER_FAILED:
      return { ...state, error: action.error, isLoading: false }
    case types.LOGIN:
      return { ...state, isLoading: true, error:undefined }
    case types.LOGIN_RECEIVED:
      return { ...state, dataLogin: action.data, isLoading: false }
    case types.LOGIN_FAILED:
      return { ...state, error: action.error, isLoading: false }
    case types.LOGOUT:
      return { ...state, isLoading: true, error:undefined }
    case types.LOGOUT_RECEIVED:
      return { ...state, datalogout: action.data, isLoading: false }
    case types.LOGOUT_FAILED:
      return { ...state, error: action.error, isLoading: false }
    case types.CLEAR_REGISTER:
      return { ...state, data: undefined, datalogout: undefined, dataLogin: undefined }
    

    default:
      return state
  }
}

export default AuthReduce;