import * as types from './index';

export const login = (params:any) => ({
    type: types.LOGIN,
    params,
});

export const logout = (params:any) => ({
    type: types.LOGOUT,
    params,
});

export const register = (params:any) => ({
    type: types.REGISTER,
    params,
  });

  export const clearRegister = () =>({
    type: types.CLEAR_REGISTER
  })
