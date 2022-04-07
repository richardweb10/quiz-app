import { takeLatest, all } from "redux-saga/effects";
import * as types from "./../actions";
import { loggin, logout, register,  } from "./authSagas";
import { create, getQuest,
   deleteQuest, getByIdQuest,
   updateQuest} from './questSagas';



function* actionWatcherAuth() {
  
  yield takeLatest(types.REGISTER, register);
  yield takeLatest(types.LOGIN, loggin);
  yield takeLatest(types.LOGOUT, logout);
  
}

function* actionWatcherQuest() {
  
  yield takeLatest(types.CREATE_QUESTIONNARIES, create);
  yield takeLatest(types.GET_QUESTIONNARIES, getQuest);
  yield takeLatest(types.DELETE_QUESTIONNARIES, deleteQuest);
  yield takeLatest(types.GET_BY_ID_QUESTIONNARIES, getByIdQuest);
  yield takeLatest(types.UPDATE_QUESTIONNARIES, updateQuest);
  
}

export default function* rootSaga() {
  yield all([
    actionWatcherAuth(), 
    actionWatcherQuest()
  ]);
}
