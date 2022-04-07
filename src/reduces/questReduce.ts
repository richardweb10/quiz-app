import * as types from '../actions/index'

const QuestReduce = (state = { isLoading: false }, action: any) => {
  switch (action.type) {
    case types.CREATE_QUESTIONNARIES:
      return { ...state, isLoading: true, error:undefined }
    case types.CREATE_QUESTIONNARIES_RECEIVED:
      return { ...state, data: action.data, isLoading: false }
    case types.CREATE_QUESTIONNARIES_FAILED:
      return { ...state, error: action.error, isLoading: false }
    
    case types.GET_QUESTIONNARIES:
        return { ...state, isLoading: true, errorQuest:undefined }
    case types.GET_QUESTIONNARIES_RECEIVED:
        return { ...state, dataQuest: action.data, isLoading: false }
    case types.GET_QUESTIONNARIES_FAILED:
        return { ...state, errorQuest: action.error, isLoading: false }
    
    case types.CLEAR_QUESTIONNARIES:
        return { ...state, data: undefined, isLoading: false, error:undefined }
       
    case types.DELETE_QUESTIONNARIES:
          return { ...state, isLoadingDel: true, errorDel:undefined }
    case types.DELETE_QUESTIONNARIES_RECEIVED:
          return { ...state, dataDel: action.data, isLoadingDel: false }
    case types.DELETE_QUESTIONNARIES_FAILED:
          return { ...state, errorDel: action.error, isLoadingDel: false }

    case types.CLEAR_DEL_QUEST:
            return {
                ...state,
                isLoadingDel: false,
                dataDel: undefined,
                errorDel: undefined
            }

    case types.GET_BY_ID_QUESTIONNARIES:
        return { ...state, isLoadingById: true, error:undefined }
    case types.GET_BY_ID_QUESTIONNARIES_RECEIVED:
        return { ...state, dataById: action.data, isLoadingById: false }
    case types.GET_BY_ID_QUESTIONNARIES_FAILED:
        return { ...state, error: action.error, isLoadingById: false }
    
    case types.UPDATE_QUESTIONNARIES:
      return { ...state, isLoading: true, error:undefined }
    case types.UPDATE_QUESTIONNARIES_RECEIVED:
      return { ...state, data: action.data, isLoading: false }
    case types.UPDATE_QUESTIONNARIES_FAILED:
      return { ...state, error: action.error, isLoading: false }
      
    
    default:
      return state
  }
}

export default QuestReduce;