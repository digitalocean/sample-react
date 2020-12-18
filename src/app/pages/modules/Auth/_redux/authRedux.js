import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest,call } from "redux-saga/effects";
import { getUserByToken,getWorldCounties } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  GetCountry : "[Get Countries] Action",
  SetCountry: "[Set Countries] Action"
};

const initialAuthState = {
  user: undefined,
  countries: [],
  authToken: undefined
};

export const reducer = persistReducer(
  { storage, key: "user-auth", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
      
        return { ...state, user };
      }

      case actionTypes.SetCountry: {
        const {countries} = action.payload;

        return {...state,countries }
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } }),
  iwantCountries : () => ({type: actionTypes.GetCountry, }),
  setCountries : (countries) => ({type: actionTypes.SetCountry, payload: {countries}})
};




export function* saga() {
  yield takeLatest(actionTypes.Login,  function* loginSaga() {
  
    yield put(actions.requestUser());
  });



  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });



  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();

    
    yield put(actions.fulfillUser(user));
  });



  yield takeLatest(actionTypes.GetCountry, function* getCountries(action) {
    

    try {
      const data = yield call(getWorldCounties);


      //call any action here and send in the data, also handle error cases
      yield put(actions.setCountries(data.data))
    } catch (error) {
     
                 //fire appropriate action in case of error 

    }


  });
  
}
