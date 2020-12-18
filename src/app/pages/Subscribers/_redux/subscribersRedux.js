import { func } from "prop-types";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest,call } from "redux-saga/effects";
import { getAllSubscribers, getSubBranches, getSubscribers2, banAllSubscriber } from "./sub_network";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const actionTypes = {
    GetAllSubscribers: "GETALL_SUBSCRIBERS",
    SetAllSubscribers: "SETALL_SUBSCRIBERS",
    GetSubBranches: "GET_SUB_BRANCHES",
    SetSubBranches: "SET_SUB_BRANCHES",
    SetSubscribers2: "SET_SUBSCRIBERS2",
    GetSubscribers2: "GET_SUBSCRIBERS2",
    ToggleErrorStatus : "TOGGLE_ERROR_STATUS",
    BanAllSubscriber : "BAN_ALL_SUBSCRIBERS",
    ChangeSubStatus2 : "CHANGE_SUB_STATUS2"
};

const initialState = {
    all_subscribers:[],
    all_branches: [],
    br_subscribers:[],
    show_error: false,
};

export const sreducer = persistReducer(
  { storage, key: "QR-Buzz-[Business]", whitelist: ["user", "authToken"] },
  (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SetAllSubscribers: { 
          const { subscribers } = action.payload;
          return { ...state, all_subscribers:subscribers };
        }
        case actionTypes.SetSubBranches: {
       
          const { branches } = action.payload;
          //console.log(branches)
          return { ...state, all_branches:branches  };
        }
        case actionTypes.SetSubscribers2: {
          //console.log(action.payload)
          const { subscribers2 } = action.payload;
          return { ...state, br_subscribers:subscribers2  };
        } 
        
        case actionTypes.ToggleErrorStatus :{
          return {...state, show_error: !state.show_error}
        } 

        case actionTypes.ChangeSubStatus2: {
          console.log("Change status")
          const {sub_id}  = action.payload.sub_id;
          var subscribers2 = [...state.all_subscribers];
          console.log(sub_id);
          console.log(subscribers2);
          var index = subscribers2.findIndex((item)=> item.id  == sub_id);
          console.log(index);
          subscribers2[index].subscriber_status = 2
          return {...state, all_subscribers:subscribers2}
        }  
        
      case actionTypes.SetLoading:{ 
          return {...state, is_loading:!state.is_loading}
      }
      default:
        return state;
    }
  }
);

export const actions = {
    getAllSubscribers: (user_id, branch_id) => ({type: actionTypes.GetAllSubscribers, payload:{user_id, branch_id}}),
    setAllSubscribers: (subscribers) => ({type: actionTypes.SetAllSubscribers, payload:{subscribers}}),
    getSubBranches: (user_id) => ({type: actionTypes.GetSubBranches, payload:user_id}),
    setSubBranches: (branches) => ({type: actionTypes.SetSubBranches, payload:{branches}}),
    getSubscribers2 : (br_id) => ({type: actionTypes.GetSubscribers2, payload:br_id}),
    setSubscribers2 : (subscribers2) => ({type: actionTypes.SetSubscribers2, payload:{subscribers2}}),
    toggleError: () => ({type:actionTypes.ToggleErrorStatus}),
    banAllSubscriber: (uid, sub_id) => ({type: actionTypes.BanAllSubscriber, payload: {uid, sub_id}}),
    changeSubStatus: (sub_id) => ({type: actionTypes.ChangeSubStatus2, payload: {sub_id}}),
}

export function* sSaga(){
    yield takeLatest(actionTypes.GetAllSubscribers,  function* getAllSubscribersSaga(action) {
      try {
          const subscribers = yield call(getAllSubscribers,action.payload)
          //console.log(subscribers)
         if (subscribers.body.subscribers) {
          yield put(actions.setAllSubscribers(subscribers.body.subscribers))
         } else {
          yield put(actions.toggleError())
           return false;
         }
          
      } catch (error) {
        //console.log(error)
      }
    });

    yield takeLatest(actionTypes.GetSubBranches,  function* getSubBranchesSaga(action) {
      
      try {
          const branches = yield call(getSubBranches,action.payload)
          //console.log(branches.body.subscribers)

          yield put(actions.setSubBranches(branches.body))
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.GetSubscribers2,  function* getSubscribers2Saga(action) {
      try {
          const subscribers2 = yield call(getSubscribers2,action.payload)
          //console.log(subscribers2.body)
          yield put(actions.setSubscribers2(subscribers2.body))
      } catch (error) {
        console.log(error)
         //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.BanAllSubscriber,  function* banAllSubscriberSaga(action) {
      console.log(action.payload)
      try {
        const ban_all_subscriber = yield call(banAllSubscriber,action.payload)
        console.log(ban_all_subscriber)
        yield put(actions.changeSubStatus(action.payload))
      } catch (error) {
         //fire appropriate action in case of error 
      }
    });
}