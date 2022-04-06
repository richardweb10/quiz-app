import { takeLatest, all } from "redux-saga/effects";
import * as types from "./../actions";
import { loggin, logout, register,  } from "./authSagas";



function* actionWatcherAuth() {
  
  yield takeLatest(types.REGISTER, register);
  yield takeLatest(types.LOGIN, loggin);
  yield takeLatest(types.LOGOUT, logout);
  
}


export default function* rootSaga() {
  yield all([
    actionWatcherAuth(), 
  ]);
}
