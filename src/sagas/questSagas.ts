import { call, put } from "@redux-saga/core/effects";
import * as types from './../actions';
import API from '../services';
import config from "../config";
import { get } from './../utils/SesionStorage';


export function* create(action:any): Generator {
  try {
    const token = get('@token');
    const userId = get('@id_user')
    const { params } = action;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token
    }
    params.userId = userId;
    const api = API.create(headers, config.url_api);
    let data:any = yield call(
      api.quest.create,
      params
    );
    if (data.data.hasOwnProperty('status')) {
      yield put({ type: types.CREATE_QUESTIONNARIES_FAILED, error: data.data })
    } else {
      yield put({ type: types.CREATE_QUESTIONNARIES_RECEIVED, data: data.data })
    }

  } catch (error:any) {
    if (error.response) {
      if (error.response.status > 499) {
        yield put({ type: types.CREATE_QUESTIONNARIES_FAILED, error: { message: 'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.' } });
      } else {
        yield put({ type: types.CREATE_QUESTIONNARIES_FAILED, error: error.response.data });
      }
    } else if (error.request) {
      yield put({ type: types.CREATE_QUESTIONNARIES_FAILED, error: { message: 'Se presentó un problema al obtener los datos, por favor inténtalo más tarde.' } });
    } else {
      yield put({ type: types.CREATE_QUESTIONNARIES_FAILED, error: { message: 'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.' } });
    }
  }
}

