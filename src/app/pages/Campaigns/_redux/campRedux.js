import { func } from "prop-types";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest,call } from "redux-saga/effects";
import { 
  getAllCampaigns,
  deleteCampaigns,
  getCampaignData,
  addCampaign,
  updateCampaign,
  getAllSchedule,
  scheduleBusiness,
  getTemplateModule,
  getFullTemplate,
  getSceduleBranches,
  addSchedule,
  deleteSchedule,
  changeSchedule,
  getAllStatistics,
  getStatisticData
} from "./camp_network";


export const actionTypes = {
    GetAllCampaigns: "GET_ALL_CAMPAIGNS",
    SetAllCampaigns: "SET_ALL_CAMPAIGNS",
    DeleteCampaigns: "DELETE_CAMPAIGN",
    DeleteCampStatus: "DELETE_CAMP_STATUS",
    GetCampaignData: "GET_CAMPAIGN_DATA",
    SetCampaignData: "SET_CAMPAIGN_DATA",
    AddCampaign: "ADD_CAMPAIGN",
    UpdateCampaign: "UPDATE_CAMPAIGN",
    GetAllSchedule: "GET_ALL_SCHEDULE",
    SetAllSchedule: "SET_ALL_SCHEDULE",
    GetTemplateModule: "GET_TEMPLATE_MODULE",
    SetTemplateModule: "SET_TEMPLATE_MODULE",
    GetFullTemplate: "GET_FULL_TEMPLATE",
    SetFullTemplate: "SET_FULL_TEMPLATE",
    GetScheduleBusiness: "GET_SCHEDULE_BUSINESS",
    SetScheduleBusiness: "SET_SCHEDULE_BUSINESS",
    GetSceduleBranches : "GET_SCHEDULE_BRANCHES",
    SetSceduleBranches : "SET_SCHEDULE_BRANCHES",
    AddSchedule: "ADD_SCHEDULE",
    DeleteSchedule: "DELETE_SCHEDULE",
    DeleteScheduleStatus: "DELETE_SCHEDULE_STATUS",
    ChangeSchedule: "CHANGE_SCHEDULE",
    ChangeScheduleStatus: "CHANGE_SCHEDULE_STATUS",
    GetAllStatistics: "GET_ALL_STATISTICS",
    SetAllStatistics: "SET_ALL_STATISTICS",
    GetStatisticData: "GET_STATISTIC_DATA",
    SetStatisticData: "SET_STATISTIC_DATA"
};

  
const initialState = {
  all_broadcasts:[],
  all_schedule:[],
  campaign_delete:"",
  campaign_data:{},
  template_modules:[],
  template_full:{},
  schedule_business: [],
  schedule_brancehs: [],
  schedule_delete:"",
  change_schedule_status:"",
  all_statistics:[],
  statistics_data:[],
  is_loading: false
};


export const campreducer = persistReducer(
  { storage, key: "QR-Buzz-[campaigns]", whitelist: ["user", "authToken"] },
  (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.SetAllCampaigns: { 
        //console.log(action.payload);
        const { campaigns } = action.payload;
        return { ...state, all_broadcasts:campaigns  };
      }

      case actionTypes.DeleteCampStatus: { 
        //console.log(action.payload);
        const message = action.payload;
        return { ...state, campaign_delete:message.status  };
      }

      case actionTypes.SetCampaignData: {
        const html = action.payload; 
        //console.log(html);
        return { ...state, campaign_data:html  };
      }

      case actionTypes.SetAllSchedule: { 
        //console.log(action.payload);
        const { schedule } = action.payload;
        return { ...state, all_schedule:schedule  };
      }

      case actionTypes.SetTemplateModule: { 
        const { modules } = action.payload;
        //console.log(modules);
        return { ...state, template_modules:modules  };
      }

      case actionTypes.SetFullTemplate: { 
        const { template } = action.payload;
        //console.log(template);
        return { ...state, template_full:template  };
      }

      case actionTypes.SetScheduleBusiness: { 
        const { bussinesses } = action.payload;
        //console.log(bussinesses);
        return { ...state, schedule_business:bussinesses  };
      }

      case actionTypes.SetSceduleBranches: {
        const { branches } = action.payload;
        //console.log(branches);
        return { ...state, schedule_brancehs:branches  };
      }

      case actionTypes.DeleteScheduleStatus: { 
        //console.log(action.payload);
        const message = action.payload;
        return { ...state, schedule_delete:message.status  };
      }

      case actionTypes.ChangeScheduleStatus: {
        const schedule_status = action.payload;
        //console.log(schedule_status);
        return { ...state, change_schedule_status:schedule_status  };
      }

      case actionTypes.SetAllStatistics: { 
        const { statistics } = action.payload;
        //console.log(statistics);
        return { ...state, all_statistics:statistics  };
      }

      case actionTypes.SetStatisticData: { 
        const { states } = action.payload;
        console.log(states);
        return { ...state, statistics_data:states  };
      }

      case actionTypes.ToggleLoading: {
        return {...state, is_loading:!state.is_loading}
      }
      default:
        return state;
    }
  }
);

export const actions = {
    getAllCampaigns : (user_id) => ({type: actionTypes.GetAllCampaigns, payload:user_id}),
    setAllCampaigns : (campaigns) => ({type: actionTypes.SetAllCampaigns, payload:{campaigns}}),
    deleteCampaigns : (id) => ({type: actionTypes.DeleteCampaigns, payload:id}),
    deleteCampStatus : (status) => ({type: actionTypes.DeleteCampStatus, payload:{status}}),
    getCampaignData : (id) => ({type: actionTypes.GetCampaignData, payload:id}),
    setCampaignData : (html) => ({type: actionTypes.SetCampaignData, payload:html}),
    addCampaign: (payload) => ({type:actionTypes.AddCampaign, payload:payload}),
    updateCampaign: (payload) => ({type:actionTypes.UpdateCampaign, payload:payload}),
    getAllSchedule : (user_id) => ({type: actionTypes.GetAllSchedule, payload:user_id}),
    setAllSchedule : (schedule) => ({type: actionTypes.SetAllSchedule, payload:{schedule}}),
    getTemplateModule : (id) => ({type: actionTypes.GetTemplateModule, payload:id}),
    setTemplateModule : (modules) => ({type: actionTypes.SetTemplateModule, payload:{modules}}),
    getFullTemplate : (name) => ({type: actionTypes.GetFullTemplate, payload:name}),
    setFullTemplate : (template) => ({type: actionTypes.SetFullTemplate, payload:{template}}),
    getScheduleBusiness : (user_id) => ({type: actionTypes.GetScheduleBusiness, payload:user_id}),
    setScheduleBusiness : (bussinesses) => ({type: actionTypes.SetScheduleBusiness, payload:{bussinesses}}),
    getSceduleBranches : (bs_id) => ({type: actionTypes.GetSceduleBranches, payload:bs_id}),
    setSceduleBranches : (branches) => ({type: actionTypes.SetSceduleBranches, payload:{branches}}),
    addSchedule: (payload) => ({type:actionTypes.AddSchedule, payload:payload}),
    deleteSchedule : (id) => ({type: actionTypes.DeleteSchedule, payload:id}),
    deleteScheduleStatus : (status) => ({type: actionTypes.DeleteScheduleStatus, payload:{status}}),
    changeSchedule : (payload) => ({type: actionTypes.ChangeSchedule, payload:payload}),
    changeScheduleStatus : (schedule_status) => ({type: actionTypes.ChangeScheduleStatus, payload:{schedule_status}}),
    getAllStatistics : (user_id) => ({type: actionTypes.GetAllStatistics, payload:user_id}),
    setAllStatistics : (statistics) => ({type: actionTypes.SetAllStatistics, payload:{statistics}}),
    getStatisticData : (id) => ({type: actionTypes.GetStatisticData, payload:id}),
    setStatisticData : (states) => ({type: actionTypes.SetStatisticData, payload:{states}}),
    toggleLoading : () => ({type: actionTypes.ToggleLoading})
}

export function* cSaga(){

    yield takeLatest(actionTypes.GetAllCampaigns,  function* getAllCampaignsSaga(action) {
      //console.log(action.payload)
      try {
          const campaigns = yield call(getAllCampaigns,action.payload)
          //console.log(campaigns)
          yield put(actions.setAllCampaigns(campaigns.body))
          if(campaigns.status == 200) {
            yield put(actions.toggleLoading)
          }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.DeleteCampaigns,  function* deleteCampaignsSaga(action) {
      //console.log(action.payload)
      try {
        const campaigns_delete = yield call(deleteCampaigns,action.payload)
        //console.log(campaigns_delete)
        yield put(actions.deleteCampStatus(campaigns_delete.body.message))
        if(campaigns_delete.body.status == true) {
          yield put(actions.toggleLoading)
        }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.GetCampaignData,  function* getCampaignDataSaga(action) {
      //console.log(action.payload)
      try {
        const campaigns_data = yield call(getCampaignData,action.payload)
        //console.log(campaigns_data)
        yield put(actions.setCampaignData(campaigns_data.body.branch[0]))
        if(campaigns_data.body.status == true) {
          yield put(actions.toggleLoading)
        }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.AddCampaign,  function* addCampaignSaga(action) {
      //console.log(action.payload)
      try {
        const add_campaign = yield call(addCampaign,action.payload)
        //console.log(add_campaign)
        //yield put(actions.setCampaignData(add_campaign.body))
        if(add_campaign.body.status == true) {
          yield put(actions.toggleLoading)
        }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.UpdateCampaign,  function* updateCampaignSaga(action) {
      //console.log(action.payload)
      try {
        const edit_campaign = yield call(updateCampaign,action.payload)
        //console.log(edit_campaign)
        //yield put(actions.setCampaignData(add_campaign.body))
        if(edit_campaign.body.status == true) {
          yield put(actions.toggleLoading)
        }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.GetAllSchedule,  function* getAllScheduleSaga(action) {
      //console.log(action.payload)
      try {
          const schedule = yield call(getAllSchedule,action.payload)
          //console.log(schedule)
          yield put(actions.setAllSchedule(schedule.body))
          if(schedule.status == 200) {
            yield put(actions.toggleLoading)
          }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.GetTemplateModule,  function* getTemplateModuleSaga(action) {
      //console.log(action.payload)
      try {
          const modules = yield call(getTemplateModule,action.payload)
          //console.log(modules)
          yield put(actions.setTemplateModule(modules.body))
          if(modules.status == true) {
            yield put(actions.toggleLoading)
          }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.GetFullTemplate,  function* getFullTemplateSaga(action) {
      //console.log(action.payload)
      try {
          const template = yield call(getFullTemplate,action.payload)
          //console.log(template)
          yield put(actions.setFullTemplate(template.body))
          if(template.status == 200) {
            yield put(actions.toggleLoading)
          }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.GetScheduleBusiness,  function* getScheduleBusinessSaga(action) {
      //console.log(action.payload)
      try {
          const business = yield call(scheduleBusiness,action.payload)
          //console.log(business)
          yield put(actions.setScheduleBusiness(business.body))
          if(business.status == 200) {
            yield put(actions.toggleLoading)
          }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.GetSceduleBranches,  function* getSceduleBranchesSaga(action) {
      //console.log(action.payload)
      try {
          const branches = yield call(getSceduleBranches,action.payload)
          //console.log(branches)
          if(branches.status == 200) {
            yield put(actions.setSceduleBranches(branches.body))
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

    yield takeLatest(actionTypes.AddSchedule,  function* addScheduleSaga(action) {
      //console.log(action.payload)
      try {
        const add_schedule = yield call(addSchedule,action.payload)
        //console.log(add_schedule)
        if(add_schedule.body.status == true) {
          yield put(actions.toggleLoading)
        }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.DeleteSchedule,  function* deleteScheduleSaga(action) {
      //console.log(action.payload)
      try {
        const schedule_delete = yield call(deleteSchedule,action.payload)
        //console.log(schedule_delete)
        yield put(actions.deleteScheduleStatus(schedule_delete.body.message))
        if(schedule_delete.body.status == true) {
          yield put(actions.toggleLoading)
        }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.ChangeSchedule,  function* changeScheduleSaga(action) {
      //console.log(action.payload)
      try {
        const schedule_status = yield call(changeSchedule,action.payload)
        //console.log(schedule_status)
        yield put(actions.changeScheduleStatus(schedule_status.body.message))
        if(schedule_status.body.status == true) {
          yield put(actions.toggleLoading)
        }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.GetAllStatistics,  function* getAllStatisticsSaga(action) {
      //console.log(action.payload)
      try {
          const statistics = yield call(getAllStatistics,action.payload)
          //console.log(statistics)
          yield put(actions.setAllStatistics(statistics.body))
          if(statistics.status == 200) {
            yield put(actions.toggleLoading)
          }
      } catch (error) {
        console.log(error)
      }
    });

    yield takeLatest(actionTypes.GetStatisticData,  function* getStatisticDataSaga(action) {
      console.log(action.payload)
      try {
          const states = yield call(getStatisticData,action.payload)
          console.log(states)
          yield put(actions.setStatisticData(states.body))
          if(states.status == 200) {
            yield put(actions.toggleLoading)
          }
      } catch (error) {
        console.log(error)
      }
    });
  
  }