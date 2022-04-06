import { call, put } from "@redux-saga/core/effects";
import * as types from './../actions';
import API from '../services';
import config from "../config";
import { get } from './../utils/SesionStorage';


export function* register(action:any): Generator {
  try {
    //const token = yield AsyncStorage.getItem("@token")
    const { params } = action;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    const api = API.create(headers, config.url_api);
    let data:any = yield call(
      api.auth.register,
      params
    );
    if (data.data.hasOwnProperty('status')) {
      yield put({ type: types.REGISTER_FAILED, error: data.data })
    } else {
      yield put({ type: types.REGISTER_RECEIVED, data: data.data })
    }

  } catch (error:any) {
    if (error.response) {
      if (error.response.status > 499) {
        yield put({ type: types.REGISTER_FAILED, error: { message: 'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.' } });
      } else {
        yield put({ type: types.REGISTER_FAILED, error: error.response.data });
      }
    } else if (error.request) {
      yield put({ type: types.REGISTER_FAILED, error: { message: 'Se presentó un problema al obtener los datos, por favor inténtalo más tarde.' } });
    } else {
      yield put({ type: types.REGISTER_FAILED, error: { message: 'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.' } });
    }
  }
}


export function* loggin(action: any): Generator {
  try {
    const { params } = action;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'origin-list',
      authorization: ''
    }
    const api = API.create(headers, config.url_api);

    let data: any = yield call(
      api.auth.login,
      params
    );
    if (data.data.hasOwnProperty('status')) {
      yield put({ type: types.LOGIN_FAILED, error: data.data })
    } else {
      yield put({ type: types.LOGIN_RECEIVED, data: data.data.data })
    }

  } catch (error:any) {
    if (error.response) {
      if (error.response.status > 499) {
        yield put({ type: types.LOGIN_FAILED, error: { message: 'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.' } });
      } else {
        yield put({ type: types.LOGIN_FAILED, error: error.response.data });
      }
    } else if (error.request) {
      yield put({ type: types.LOGIN_FAILED, error: { message: 'Se presentó un problema al obtener los datos, por favor inténtalo más tarde.' } });
    } else {
      yield put({ type: types.LOGIN_FAILED, error: { message: 'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.' } });
    }
  }
}

export function* logout(action: any): Generator {
  try {
    const token = get('@token');
    const { params } = action;
    params.token = token;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token
    }
    const api = API.create(headers, config.url_api);

    let data: any = yield call(
      api.auth.logout,
      params
    );
    if (data.data.hasOwnProperty('status')) {
      yield put({ type: types.LOGOUT_FAILED, error: data.data })
    } else {
      yield put({ type: types.LOGOUT_RECEIVED, data: data.data.data })
    }

  } catch (error) {
    yield put({ type: types.LOGOUT_FAILED, error: error });
  }
}

