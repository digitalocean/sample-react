import { func } from "prop-types";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest,call } from "redux-saga/effects";
import { 
  getBusinesses, 
  AddBusiness, 
  getAllCountries, 
  addBranch,
  getBranches1, 
  getSubscribers, 
  GetBranch, 
  GetBusiness, 
  updateBranchAddr, 
  deleteBranch, 
  banSubscriber, 
  getBusBranches, 
  updateBusinessAddr,
  deleteBusiness,
  getBranchQR
} from "./network";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const actionTypes = {
    AddBusiness: "ADD_BUSINESS",
    AddBranch: "ADD_BRANCH",
    GetBusinesses: "GET_BUSINESSES",
    SetBusinesses: "SET_BUSINESSES",
    SetBranches: "SET_BRANCHES",
    GetBranches: "GET_BRANCHES",
    SetSubscribers: "SET_SUBSCRIBERS",
    GetSubscribers: "GET_SUBSCRIBERS",
    VerifyBusiness: "VERIFY_BUSINESS",
    SetLoading: "SET_LOADING",
    GetCountries: "GET_COUNTRIES",
    SetCountries: "SET_COUNTRIES",
    GetBranch: "GET_BRANCH",
    SetBranch: "SET_BRANCH",
    GetBusiness : "GET_BUSINESS",
    SetBusiness : "SET_BUSINESS",
    UpdateBranchAddr: "UPDATE_BRANCH_ADDRESS",
    SetBranchAddr: "SET_BRANCH_ADDRESS",
    ToggleErrorStatus : "TOGGLE_ERROR_STATUS",
    DeleteBranch : "DELETE_BRANCH",
    BanSubscriber: "BAN_SUBSCRIBER",
    ChangeSubStatus : "CHANGE_SUB_STATUS",
    GetBusBranches : "GET_BUS_BRANCHES",
    SetBusBranches: "SET_BUS_BRANCHES",
    UpdateBusinessAddr : "UPDATE_BUSINESS_ADDRESS",
    DeleteBusiness: "DELETE_BUSINESS",
    SaveBusiness: "SAVE_BUSINESS",
    GetBranchQR : "GET_BRANCH_QR",
    SetBranchQR: "SET_BRANCH_QR"
  };

  
const initialState = {
    all_business:[] ,
    is_loading: false,
    current_branch:{},
    current_business:{},
    all_branches:[],
    all_subscribers:[],
    all_businesses:[],
    all_countries:[],
    update_branch_addr:{},
    show_error: false,
    saveBusiness: '',
    setBranchQR: ''
  };


  export const breducer = persistReducer(
    { storage, key: "QR-Buzz-[Business]", whitelist: ["user", "authToken"] },
    (state = initialState, action) => {
      switch (action.type) {
        // case actionTypes.AddBusiness: {
        //   const { newBusiness } = action.payload;
        //   return { ...state, all_business: state.all_business.push(newBusiness) };
        // }

        case actionTypes.SetBusinesses: { 
          //console.log(action.payload);
          const { businesses } = action.payload;
          return { ...state, all_businesses:businesses  };
        }
        case actionTypes.SetBranches: {
          const { branches } = action.payload;

          //console.log(branches)
          return { ...state, all_branches:branches  };
        }
        case actionTypes.SetSubscribers: {
          const { subscribers } = action.payload;
          //console.log(branches)
          return { ...state, all_subscribers:subscribers  };
        }  
        case actionTypes.SetCountries: {
          const { countries } = action.payload;
          //console.log(countries);
          return { ...state, all_countries:countries  };
        }
        case actionTypes.SetBranch: {
      
          const { branch } = action.payload;
          //console.log(offers)
          return { ...state, current_branch:branch  };
        }

        case actionTypes.SetBusiness: {
          return { ...state, current_business: action.payload  };
        }

        case actionTypes.SetBranchAddr: {
          const { branch_addr } = action.payload;
          //console.log(branch_addr)
          return { ...state, update_branch_addr:branch_addr  };
        }

        case actionTypes.SetLoading:{ 
            return {...state, is_loading:!state.is_loading}
        }

        case actionTypes.ToggleErrorStatus :{
          return {...state, show_error: !state.show_error}
        } 
        
        case actionTypes.ChangeSubStatus: {
          //console.log("Change status")
          const {sub_id}  = action.payload.sub_id;
          var subscribers = [...state.all_subscribers];
          //console.log(sub_id);
          //console.log(subscribers);
          var index = subscribers.findIndex((item)=> item.id  == sub_id);
          //console.log(index);
          subscribers[index].subscriber_status = 2
          return {...state, all_subscribers:subscribers}
        }

        case actionTypes.SaveBusiness: {
          //console.log(action.payload)
          const { business } = action.payload;
          return { ...state, saveBusiness:business  };
        }

        case actionTypes.SetBusBranches: {
       
          const { branches } = action.payload;
          //console.log(branches)
          return { ...state, all_branches:branches  };
        }

        case actionTypes.SetBranchQR: {
          const { qr } = action.payload;
          //console.log(qr)
          return { ...state, setBranchQR:qr  };
        }

        default:
          return state;
      }
    }
  );
  


export const actions = {
    addBusiness: business => ({ type: actionTypes.AddBusiness, payload:business }),
    addBranch: branch => ({ type: actionTypes.AddBranch, payload:branch }),
    getBusinesses : (user_id) => ({type: actionTypes.GetBusinesses, payload: user_id}),
    getBranches : (bs_id) => ({type: actionTypes.GetBranches, payload:bs_id}),
    getSubscribers : (br_id) => ({type: actionTypes.GetSubscribers, payload:br_id}),
    setSubscribers : (subscribers) => ({type: actionTypes.SetSubscribers, payload:{subscribers}}),
    getCountries : () => ({type: actionTypes.GetCountries}),
    setBusinesses : (businesses) => ({type: actionTypes.SetBusinesses, payload: { businesses}}),
    setBranches : (branches) => ({type: actionTypes.SetBranches, payload: { branches}}),
    setCountries : (countries) => ({type: actionTypes.SetCountries, payload: { countries}}),
    setLoading : () => ({type: actionTypes.SetLoading}),
    getBranch: (br_id) => ({type: actionTypes.GetBranch, payload:br_id}),
    setBranch: (branch) => ({type: actionTypes.SetBranch, payload:{branch}}),
    getBusiness: (bid) => ({type: actionTypes.GetBusiness, payload:bid}),
    setBusiness: (business) => ({type: actionTypes.SetBusiness, payload:business}),
    updateBranchAddr: (id, address) => ({type: actionTypes.UpdateBranchAddr, payload:{id, address}}),
    setBranchAddr: (data) => ({type: actionTypes.SetBranchAddr, payload:data.address}),
    toggleError: () => ({type:actionTypes.ToggleErrorStatus}),
    deleteBranch: (id, user_id) => ({type: actionTypes.DeleteBranch, payload: {id, user_id}}),
    banSubscriber: (sub_id, br_id) => ({type: actionTypes.BanSubscriber, payload: {sub_id, br_id}}),
    changeSubStatus: (sub_id) => ({type: actionTypes.ChangeSubStatus, payload: {sub_id}}),
    getBusBranches: (user_id) => ({type: actionTypes.GetBusBranches, payload:user_id}),
    setBusBranches: (branches) => ({type: actionTypes.SetBusBranches, payload:{branches}}),
    updateBusinessAddr: (id, office_address) => ({type: actionTypes.UpdateBusinessAddr, payload:{id, office_address}}),
    deleteBusiness: id => ({type: actionTypes.DeleteBusiness, payload: id}),
    saveBusiness: (business) => ({type: actionTypes.SaveBusiness , payload: {business}}),
    getBranchQR: (br_id) => ({type: actionTypes.GetBranchQR, payload:br_id}),
    setBrancheQR : (qr) => ({type: actionTypes.SetBranchQR, payload: {qr}}),
  }


export function* bSaga(){

    //first part is called watcher saga, because it watches for that particualar action, second part is worker saga
    yield takeLatest(actionTypes.GetBusinesses,  function* getBusinessSaga(action) {
        yield put(actions.setLoading());
        try {
            const businesses = yield call(getBusinesses,action.payload)
            yield put(actions.setLoading());

            yield put(actions.setBusinesses(businesses.body))
        } catch (error) {
           //fire appropriate action in case of error 
        }
      });
    //first part is called watcher saga, because it watches for that particualar action, second part is worker saga
    yield takeLatest(actionTypes.GetBranches,  function* branchSaga(action) {
        yield put(actions.setLoading());
        try {
            //console.log('This is payload and data',action.payload)
            const datarespo = yield call(getBranches1,action.payload)
            //console.log(datarespo)
            yield put(actions.setLoading());
         
            yield put(actions.setBranches(datarespo.body))
        } catch (error) {
          console.log(error)
           //fire appropriate action in case of error 
        }
      });
    
    yield takeLatest(actionTypes.GetSubscribers,  function* subscribersSaga(action) {
        yield put(actions.setLoading());
        //console.log(action.payload)
        try {
            //console.log('This is payload and data',action.payload)
            const data_subscribers = yield call(getSubscribers,action.payload)
            //console.log(data_subscribers)
            if (data_subscribers.body == undefined) {
              //console.log("Error --------------");
              return false;
            } else {
              //console.log(data_subscribers)
              yield put(actions.setSubscribers(data_subscribers.body))
              yield put(actions.setLoading());
            }
              
        } catch (error) {
          console.log(error)
           //fire appropriate action in case of error 
        }
      });

    yield takeLatest(actionTypes.AddBusiness,  function* addBusinessSaga(action) {
        yield put(actions.setLoading());
        //console.log(action.payload);
        try {
            const business = yield call(AddBusiness,action.payload)
            //console.log(business)
            yield put(actions.setLoading());
            if(business.status == true){
              yield put(actions.saveBusiness(business.body))
            } else {
              yield put(actions.toggleError())
            }
        } catch (error) {
           //fire appropriate action in case of error 
        }
      });

    yield takeLatest(actionTypes.GetCountries,  function* GetCountriesSaga() {
        yield put(actions.setLoading());
        try {
            const countries = yield call(getAllCountries)
            yield put(actions.setLoading());

            yield put(actions.setCountries(countries.body))
        } catch (error) {
          console.log(error);
           //fire appropriate action in case of error 
        }
      });

    yield takeLatest(actionTypes.AddBranch,  function* addBusinessSaga(action) {
        yield put(actions.setLoading());
        try {
            const branches = yield call(addBranch(action.payload))
            //console.log(branches)

          
            yield put(actions.setLoading());

            yield put(actions.setBranches(branches.body))
        } catch (error) {
           //fire appropriate action in case of error 
        }
      });

    yield takeLatest(actionTypes.GetBranch,  function* getBranchSaga(action) {
      
      try {
          const branch = yield call(GetBranch,action.payload)
          //console.log(branch)

          yield put(actions.setBranch(branch.body[0]))
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.GetBusiness,  function* getBusinessSaga(action) {
      
      try {
          const business = yield call(GetBusiness,action.payload)
          //console.log(business)

          yield put(actions.setBusiness(business.body[0]))
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.UpdateBranchAddr,  function* updateBranchAddrSaga(action) {
      //console.log(action.payload)
      try {
          const branch_addr = yield call(updateBranchAddr,action.payload)
          //console.log(branch_addr.body.status)
          //var branch_addr = branch_addr.body.status;
          if (branch_addr.body.status === true) {
            toast.success(branch_addr.body.message, {position: "top-right",autoClose: 3000});
          } else {
            toast.error(branch_addr.body.message, {position: "top-right",autoClose: 3000}); 
            yield put(actions.toggleError())
            return false;
          }
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.UpdateBusinessAddr,  function* updateBusinessAddrSaga(action) {
      //console.log(action.payload)
      try {
          const business_addr = yield call(updateBusinessAddr,action.payload)
          //console.log(business_addr.body)
          if (business_addr.body.status === true) {
            //console.log("Business Address Updated")
          } else {
            yield put(actions.toggleError())
            return false;
          }
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.DeleteBranch,  function* deleteBranchSaga(action) {
      try {
        const remove = yield call(deleteBranch,action.payload)
        //console.log(remove)
        toast.success(remove.body.message, {position: "top-right",autoClose: 3000});
      } catch (error) {
         //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.DeleteBusiness,  function* deleteBusinessSaga(action) {
      try {
        const removeBus = yield call(deleteBusiness,action.payload)
        //console.log(removeBus)
      } catch (error) {
         //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.BanSubscriber,  function* banSubscriberSaga(action) {
      //console.log(action.payload)
      try {
        const ban_subscriber = yield call(banSubscriber,action.payload)
        //console.log(ban_subscriber)
        yield put(actions.changeSubStatus(action.payload))
      } catch (error) {
         //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.GetBusBranches,  function* getBusBranchesSaga(action) {
      
      try {
          const branches = yield call(getBusBranches,action.payload)
          //console.log(branches.body)
          yield put(actions.setBusBranches(branches.body))
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.GetBranchQR,  function* getBranchQRSaga(action) {
      //console.log(action.payload)
      try {
          const branch_qr = yield call(getBranchQR,action.payload)
          //console.log(branch_qr.body)

          yield put(actions.setBrancheQR(branch_qr.body))
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });

}