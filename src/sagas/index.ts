import { takeLatest, all } from "redux-saga/effects";
import * as types from "./../actions";
import { loggin, logout, register,  } from "./authSagas";
import { create} from './questSagas';



function* actionWatcherAuth() {
  
  yield takeLatest(types.REGISTER, register);
  yield takeLatest(types.LOGIN, loggin);
  yield takeLatest(types.LOGOUT, logout);
  
}

function* actionWatcherQuest() {
  
  yield takeLatest(types.CREATE_QUESTIONNARIES, create);
  
}

export default function* rootSaga() {
  yield all([
    actionWatcherAuth(), 
    actionWatcherQuest()
  ]);
}
