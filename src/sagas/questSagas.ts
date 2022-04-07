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

    yield queryOk(data.data, types.CREATE_QUESTIONNARIES_FAILED,types.CREATE_QUESTIONNARIES_RECEIVED );

  } catch (error:any) {
    yield querError(error, types.CREATE_QUESTIONNARIES_FAILED );
  }
}


export function* getQuest(action:any): Generator {
  try {
    const token = get('@token');
    const { params } = action;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token
    }
    const api = API.create(headers, config.url_api);
    let data:any = yield call(
      api.quest.getQuestionnaire,
      params
    );
    yield queryOk(data.data, types.GET_QUESTIONNARIES_FAILED, types.GET_QUESTIONNARIES_RECEIVED );
  } catch (error:any) {
    yield querError(error, types.GET_QUESTIONNARIES_FAILED );
  }
}

export function* deleteQuest(action:any): Generator {
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
      api.quest.deleteQuest,
      params
    );

    yield queryOk(data.data, types.DELETE_QUESTIONNARIES_FAILED,types.DELETE_QUESTIONNARIES_RECEIVED );

  } catch (error:any) {
    yield querError(error, types.DELETE_QUESTIONNARIES_FAILED );
  }
}

export function* getByIdQuest(action:any): Generator {
  try {
    const token = get('@token');
    const { params } = action;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token
    }
    const api = API.create(headers, config.url_api);
    let data:any = yield call(
      api.quest.getByIdQuest,
      params
    );
    yield queryOk(data.data, types.GET_BY_ID_QUESTIONNARIES_FAILED, types.GET_BY_ID_QUESTIONNARIES_RECEIVED );
  } catch (error:any) {
    yield querError(error, types.GET_BY_ID_QUESTIONNARIES_FAILED );
  }
}




function* queryOk(data:any, type_failed:any, type_received:any ): Generator{
  if (data.hasOwnProperty('status')) {
    yield put({ type: type_failed, error: data })
  } else {
    yield put({ type: type_received, data })
  }
}

function* querError(error:any, type_failed:any ): Generator{
  if (error.response) {
    if (error.response.status > 499) {
      yield put({ type: type_failed, error: { message: 'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.' } });
    } else {
      yield put({ type: type_failed, error: error.response.data });
    }
  } else if (error.request) {
    yield put({ type: type_failed, error: { message: 'Se presentó un problema al obtener los datos, por favor inténtalo más tarde.' } });
  } else {
    yield put({ type: type_failed, error: { message: 'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.' } });
  }
}

export function* updateQuest(action:any): Generator {
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
      api.quest.updateQuest,
      params
    );

    yield queryOk(data.data, types.UPDATE_QUESTIONNARIES_FAILED,types.UPDATE_QUESTIONNARIES_RECEIVED );

  } catch (error:any) {
    yield querError(error, types.UPDATE_QUESTIONNARIES_FAILED );
  }
}