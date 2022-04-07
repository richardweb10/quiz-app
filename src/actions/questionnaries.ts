import * as types from './index';

export const create = (params:any) => ({
    type: types.CREATE_QUESTIONNARIES,
    params,
});


