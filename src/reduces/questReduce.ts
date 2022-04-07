import * as types from '../actions/index'

const QuestReduce = (state = { isLoading: false }, action: any) => {
  switch (action.type) {
    case types.CREATE_QUESTIONNARIES:
      return { ...state, isLoading: true, error:undefined }
    case types.CREATE_QUESTIONNARIES_RECEIVED:
      return { ...state, data: action.data, isLoading: false }
    case types.CREATE_QUESTIONNARIES_FAILED:
      return { ...state, error: action.error, isLoading: false }
    
    default:
      return state
  }
}

export default QuestReduce;