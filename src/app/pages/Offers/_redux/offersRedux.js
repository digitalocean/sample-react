import { func } from "prop-types";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest,call } from "redux-saga/effects";
import { 
  getOffers, 
  getBusinesses22, 
  AddOffer,
  AddOffers, 
  ExpireOffer, 
  DeleteOffer, 
  EditOffer, 
  getBranches 
} from "./off_network";


export const actionTypes = {
    AddOffer: "ADD_OFFER",
    AddOffers: "ADD_OFFERS",
    ExpireOffer: "EXPIRE_OFFER",
    SetOffers: "SET_OFFERS",
    UpdateOfferStatus : "UPDATE_OFFER_STATUS",
    GetOffers: "GET_OFFERS",
    GetBusinesses22: "GET_BUSINESSES",
    SetBusinesses22: "SET_BUSINESSES",
    DeleteOffer: "DELETE_OFFER",
    RemoveOfferRow: "REMOVE_OFFER_ROW",
    EditOffer: "EDIT_OFFER",
    GetOfferBranches: "GET_BRANCHES",
    SetOfferBranches: "SET_BRANCHES",
    ToggleLoading : "TOGGLE_LOADING"
};

  
const initialState = {
  all_offers:[],
  offer_businesses:[],
  offer_branches:[],
  is_loading: false
};


export const ofreducer = persistReducer(
  { storage, key: "QR-Buzz-[Offers]", whitelist: ["user", "authToken"] },
  (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.SetBusinesses22: { 
        //console.log(action.payload);
        const { businesses } = action.payload;
        return { ...state, offer_businesses:businesses  };
      }

      case actionTypes.UpdateOfferStatus: {
        let now = new Date();
        const {offer_id}  = action.payload
        var offers = [...state.all_offers]
         var index = offers.findIndex((item)=> item.id  == offer_id.id)
        offers[index].status = 2
        offers[index].expire_date = now
        return {...state, all_offers:offers}
      }

      case actionTypes.RemoveOfferRow: {
        //console.log("Removing")
        const {offer_id}  = action.payload
        var offers = [...state.all_offers]
         var index = offers.findIndex((item)=> item.id  == offer_id.id)
         //console.log("Remaining Offers: "+offers);
         offers.splice(index, 1)
        return {...state, all_offers:offers}
      }

      case actionTypes.SetOfferBranches: {
        const { branches } = action.payload;
        //console.log(branches)
        
        return { ...state, offer_branches:branches  };
      }

       case actionTypes.SetOffers: {
          const { offers } = action.payload;
          //console.log(offers)
          return { ...state, all_offers:offers  };
        }  

        case actionTypes.ToggleLoading: {
          return {...state, is_loading:!state.is_loading}
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
    addOffer: offers => ({ type: actionTypes.AddOffer, payload:offers }),
    addOffers: offers => ({ type: actionTypes.AddOffers, payload:offers }),
    expireOffer: expire => ({ type: actionTypes.ExpireOffer, payload:expire }),
    deleteOffer: deloffer => ({ type: actionTypes.DeleteOffer, payload:deloffer }), 
    getOffers : (br_id) => ({type: actionTypes.GetOffers, payload:br_id}),
    setOffers : (offers) => ({type: actionTypes.SetOffers, payload:{offers}}),
    updateOfferStatus : (offer_id) => ({type: actionTypes.UpdateOfferStatus, payload: {offer_id}}),
    removeOfferRow: (offer_id) => ({type: actionTypes.RemoveOfferRow, payload: {offer_id}}),
    getBusinesses22 : (user_id) => ({type: actionTypes.GetBusinesses22, payload:user_id}),
    setBusinesses22 : (businesses) => ({type: actionTypes.SetBusinesses22, payload: { businesses}}),
    editOffer : editOffer => ({ type: actionTypes.EditOffer, payload:editOffer }),
    getOfferBranches : (bs_id) => ({type: actionTypes.GetOfferBranches, payload:bs_id}),
    setOfferBranches : (branches) => ({type: actionTypes.SetOfferBranches, payload: { branches}}),
    toggleLoading : () => ({type: actionTypes.ToggleLoading})
}


export function* ofSaga(){

    yield takeLatest(actionTypes.GetOffers,  function* subOffersSaga(action) {
  
      //yield put(actions.setLoading());
      try {
          //console.log('This is payload and data',action.payload)
          const data_offers = yield call(getOffers,action.payload)
          //console.log(data_offers.body)
          yield put(actions.setOffers(data_offers.body))
          //yield put(actions.setLoading());
      } catch (error) {
        console.log(error)
        //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.GetBusinesses22,  function* getBusiness22Saga(action) {
      //yield put(actions.setLoading());
      try {
          const businesses22 = yield call(getBusinesses22,action.payload)
         // yield put(actions.setLoading());

          yield put(actions.setBusinesses22(businesses22.body))
      } catch (error) {
         //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.AddOffer,  function* addOfferSaga(action) {
      //yield put(actions.setLoading());
      try {
          const offers = yield call(AddOffer(action.payload))
          //console.log(offers)
          //yield put(actions.setLoading());
          yield put(actions.setOffers(offers.body))
      } catch (error) {
         //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.AddOffers,  function* addOfferSaga(action) {
      //yield put(actions.setLoading());
      console.log(action.payload)
      try {
          const offers = yield call(AddOffers(action.payload))
          console.log(offers)
          //yield put(actions.setLoading());
          yield put(actions.setOffers(offers.body))
      } catch (error) {
         //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.ExpireOffer,  function* expireOfferSaga(action) {
      try {
        //console.log(action.payload)
        
        const expire = yield call(ExpireOffer,action.payload)
          //work to do, show error message in case of failed api call.
        yield put(actions.updateOfferStatus(action.payload))
          //yield put(actions.setOffers(expire.body))
      } catch (error) {
         //fire appropriate action in case of error 
      }
    });
    
    yield takeLatest(actionTypes.DeleteOffer,  function* deleteOfferSaga(action) {
      try {
        //console.log(action.payload)
        
        const deloffer = yield call(DeleteOffer,action.payload)
          //work to do, show error message in case of failed api call.
        yield put(actions.removeOfferRow(action.payload))
          //yield put(actions.setOffers(expire.body))
      } catch (error) {
         //fire appropriate action in case of error 
      }
    });
    
    yield takeLatest(actionTypes.EditOffer,  function* deleteOfferSaga(action) {
      try {
        //console.log(action.payload)
        
        const editOffer = yield call(EditOffer,action.payload)

        yield put(actions.setOffers(editOffer.body))
      } catch (error) {
         //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.GetOfferBranches,  function* getOfferBranchesSaga(action) {
      //console.log(action.payload)
      try {
          //console.log('This is payload and data',action.payload)
          yield put(actions.toggleLoading)
          const branches = yield call(getBranches,action.payload)
          //console.log(branches)
          if(branches.status == 200) {
            yield put(actions.setOfferBranches(branches.body))
            yield put(actions.toggleLoading)
          } else {
            yield put(actions.setOfferBranches([]))
            yield put(actions.toggleLoading)
          }
      } catch (error) {
        yield put(actions.toggleLoading)
        console.log(error)
         //fire appropriate action in case of error 
      }
    });

  }







