import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest,call } from "redux-saga/effects";
import { 
  getUserByToken,
  getWorldCounties, 
  login, 
  forgotPassword, 
  registerUser, 
  userCountries, 
  updateProfile,
  uploadProfileImage,
  updateProfileImg,
  resetPassword,
  getProfile,
  resetUserPassword
} from "./authCrud";

export const actionTypes = {
  Login: "LOGIN_ACTION",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  GetCountry : "[Get Countries] Action",
  SetCountry: "[Set Countries] Action",
  SetUser: "SET_USER",
  ForgotPassword: "FORGOT_PASSWORD",
  ForgotMsg : "FORGOT_MSG",
  RegisterUser : "REGISTER_USER",
  RegisterStatus : "REGISTER_STATUS",
  RegUser: "REG_USER",
  GetUserCountries: "GET_USER_COUNTRIES",
  SetUserCountries: "SET_USER_COUNTRIES",
  GetUpdateProfile : "GET_UPDATE_PROFILE",
  SetUserProfile: "SET_USER_PROFILE",
  UploadProfileImg : "UPLOAD_PROFILE_IMG",
  SetProfileImage : "SET_PROFILE_IMAGE",
  ResetPassword : "RESET_PASSWORD",
  ResetMsg : "RESET_MSG",
  UpdateProfileImg : "UPDATE_PROFILE_IMAGE",
  GetProfile : "GET_PROFILE",
  SetProfile : "SET_PROFILE",
  ToggleLoader : "TOGGLE_LOADER",
  ResetUserPassword : "RESET_USER_PASSWORD",
  SetResetPassword : "SET_RESET_PASSWORD"
};

const initialAuthState = {
  user: undefined,
  countries: [],
  authToken: undefined,
  token: undefined,
  forgotMsg:false,
  registerStatus: false,
  user_countries:[],
  is_loading:false,
  pr_img:"",
  resetMsg: false,
  set_reset_password: false
};

export const reducer = persistReducer(
  { storage, key: "user-auth", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {

      case actionTypes.Register: {
        const { authToken } = action.payload;
        return { authToken, user: undefined };
      }

      case actionTypes.SetProfile: {
        const { user_profile } = action.payload;
        console.log(user_profile)
        return { ...state, user: user_profile };
      }

      case actionTypes.Logout: {
        return initialAuthState;
      }
      case actionTypes.ToggleLoader: {
        return { ...state, is_loading: !state.is_loading };

      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.SetCountry: {
        const {countries} = action.payload;
        return {...state,countries }
      }

      case actionTypes.SetUser: {
        const {user} = action.payload;
        //console.log(user);
        return {...state,user: user, authToken:user.token, token:user.token }
      }

      case actionTypes.RegUser: {
        const {user} = action.payload;
        //console.log(user);
        return {...state,user: user.user, authToken:user.token, token:user.token }
      }

      case actionTypes.RegisterStatus: {
        const {status} = action.payload;
        //console.log(status);
        return {...state, registerStatus:  status}
      }

      case actionTypes.ForgotMsg: {
        const {msg} = action.payload;
        return {...state,forgotMsg: msg}
      }

      case actionTypes.SetUserCountries: {
        const { countries } = action.payload;
        return { ...state, user_countries:countries  };
      }
      case actionTypes.SetUserProfile: { 
        const { user } = action.payload;
        //console.log(user);
        return { ...state, user:user  };
      }

      case actionTypes.SetProfileImage: {
        const { image } = action.payload;
        //console.log(image);
        var user = state.user;
        //console.log(user)
        var index = user.image;
        //console.log(index);
        return { ...state, pr_img: image, index: image};
      }

      case actionTypes.ResetMsg: {
        const {reset_msg} = action.payload;
        //console.log(reset_msg)
        return {...state,resetMsg: reset_msg}
      }
      
      case actionTypes.SetResetPassword: {
        const {pstatus} = action.payload;
        console.log(pstatus)
        return {...state,set_reset_password: pstatus}
      }

      default:
        return state;
    }
  }
);

export const actions = {
   login: (email) => ({ type: actionTypes.Login, payload:email  }),
   setUser: (user) => ({type:actionTypes.SetUser, payload: user}),
  register: authToken => ({ type: actionTypes.Register, payload: { authToken } }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } }),
  iwantCountries : () => ({type: actionTypes.GetCountry, }),
  setCountries : (countries) => ({type: actionTypes.SetCountry, payload: {countries}}),
  forgotPassword : (email) => ({ type: actionTypes.ForgotPassword, payload:email  }),
  forgotMsg : (msg) => ({type: actionTypes.ForgotMsg, payload:{msg}}),
  registerUser : (user) => ({ type: actionTypes.RegisterUser, payload:user  }),
  registerStatus : (status) => ({type: actionTypes.RegisterStatus, payload: {status}}),
  registerLogin : (user) => ({type:actionTypes.RegUser, payload: {user}}),
  getUserCountries : () => ({type: actionTypes.GetUserCountries}),
  setUserCountries : (countries) => ({type: actionTypes.SetUserCountries, payload: { countries}}),
  getUpdateProfile : (user) => ({type: actionTypes.GetUpdateProfile, payload: user}),
  setUserProfile : (user) => ({type: actionTypes.SetUserProfile, payload: user}),
  uploadProfileImg : (datas) => ({type: actionTypes.UploadProfileImg, payload: datas}),
  setImagePath : (image) => ({type: actionTypes.SetImagePath, payload: {image}}),
  resetPassword : (password) => ({type: actionTypes.ResetPassword, payload: password}),
  resetMsg : (reset_msg) => ({type: actionTypes.ResetMsg, payload:{reset_msg}}),
  updateProfileImg : (imagedata) => ({type:actionTypes.UploadProfileImg, payload: imagedata}),
  setProfileImage : (image) => ({type:actionTypes.SetProfileImage, payload: {image}}),
  getProfile : (user_email) => ({type: actionTypes.GetProfile, payload:user_email}),
  toggleLoader : ()=> ({type: actionTypes.ToggleLoader}),
  setProfile : (user_profile) => ({type: actionTypes.SetProfile, payload:user_profile }),
  resetUserPassword : (user_password) => ({type: actionTypes.ResetUserPassword, payload: user_password}),
  setResetPassword : (pstatus) => ({type: actionTypes.SetResetPassword, payload:{pstatus}})
};

export function* saga() {

  yield takeLatest(actionTypes.Login,  function* loginSaga(action) {
    try {
        const login_data = yield call(login,action.payload)
        if(login_data.body.auth == true ) {
          yield put(actions.setUser(login_data.body))
        } else {
          return [400]
        }
    } catch (error) {
        console.log(error)
    }
  });

  yield takeLatest(actionTypes.ForgotPassword,  function* forgotPasswordSaga(action) {
    try {
        const forgot_pass = yield call(forgotPassword,action.payload)
        if(forgot_pass.body.status == true ) {
          yield put(actions.forgotMsg(true))
        } else {
          yield put(actions.forgotMsg(false))
        }
    } catch (error) {
        console.log(error)
    }
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

  yield takeLatest(actionTypes.RegisterUser, function* registerUserSaga(action) {
    //var ur_data = action.payload;
    try {
      const register_user = yield call(registerUser,action.payload)
      //console.log(ur_data)
      //console.log(register_user)
      if(register_user.body.auth == true) {
        //console.log(register_user.body.user)
        var {push} = action.payload;
        yield put(actions.registerStatus(true))
        yield put(actions.registerLogin(register_user.body))
        yield put(push('/dashboard'))
      } else {
        yield put(actions.registerStatus(false))
      }
    } catch (error) {
        console.log(error)
    }
  });

  yield takeLatest(actionTypes.GetUserCountries,  function* GetUserCountriesSaga() {
      try {
          const user_countries = yield call(userCountries)
          //console.log(user_countries)
          yield put(actions.setUserCountries(user_countries.body))
      } catch (error) {
        console.log(error);
        //fire appropriate action in case of error 
      }
  });

  yield takeLatest(actionTypes.GetUpdateProfile,  function* getUpdateProfileSaga(action) {
    
    //console.log(action.payload);
    try {
        const user = yield call(updateProfile,action.payload)
        //console.log(user)
        yield put(actions.setUserProfile(user.body))
    } catch (error) {
        //fire appropriate action in case of error 
    }
  });  
  
  yield takeLatest(actionTypes.UploadProfileImg,  function* uploadProfileImgSaga(action) {
    var data_up = action.payload;
    yield put(actions.toggleLoader())
    try {
      const resp = yield call(uploadProfileImage,action.payload)
      //console.log(resp)
      //console.log(data_up.user, resp.body.location)
      const up_img_data = yield call(updateProfileImg,({user_id: data_up.user, image: String(resp.body.location)}))
      yield put(actions.setProfileImage(resp.body.location))
      yield put(actions.toggleLoader())

      //console.log(up_img_data)
    } catch (error) {
      yield put(actions.toggleLoader())

        console.log(error)
    }
  });

  yield takeLatest(actionTypes.ResetPassword,  function* resetPasswordSaga(action) {
    //console.log(action.payload);
    try {
        const reset_password = yield call(resetPassword,action.payload)
        console.log(reset_password)
        if(reset_password.body.status == true ) {
          yield put(actions.resetMsg(true))
        } else {
          yield put(actions.resetMsg(false))
        }
    } catch (error) {
        //fire appropriate action in case of error 
    }
  });  

  yield takeLatest(actionTypes.GetProfile,  function* getProfileSaga(action) {
    console.log(action.payload)
    try {
        const user_profile = yield call(getProfile,action.payload)
        console.log(user_profile)
        
         if(user_profile.body.status == true) {
          //yield put(actions.setProfile(user_profile.body.user))
        } 
    } catch (error) {
        console.log(error)
    }
  });

  yield takeLatest(actionTypes.ResetUserPassword,  function* resetUserPasswordSaga(action) {
    //console.log(action.payload)
    try {
        const reset_pass = yield call(resetUserPassword,action.payload)
        if(reset_pass.body.status == true ) {
          yield put(actions.setResetPassword(true))
        } else {
          yield put(actions.setResetPassword(false))
        }
    } catch (error) {
        console.log(error)
    }
  });

}
