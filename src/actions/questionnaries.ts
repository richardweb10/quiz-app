import * as types from './index';

export const create = (params:any) => ({
    type: types.CREATE_QUESTIONNARIES,
    params,
});

export const getQuest = (params:any) => ({
    type: types.GET_QUESTIONNARIES,
    params,
});

export const clearQuest = (params:any) => ({
    type: types.CLEAR_QUESTIONNARIES,
    params,
});

export const deleteQuest = (params:any) => ({
    type: types.DELETE_QUESTIONNARIES,
    params,
});

export const clearDelQuest = (params:any) => ({
    type: types.CLEAR_DEL_QUEST,
    params,
});

export const getQuestById = (params:any) => ({
    type: types.GET_BY_ID_QUESTIONNARIES,
    params,
});

export const updateQuest = (params:any) => ({
    type: types.UPDATE_QUESTIONNARIES,
    params,
});



