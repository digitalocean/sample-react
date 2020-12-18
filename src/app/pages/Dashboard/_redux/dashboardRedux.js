import { func } from "prop-types";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest,call } from "redux-saga/effects";
import { getPosts, getSubscriptions, getEngagements, getEngageGraph } from "./pnetwork";

export const actionTypes = {
    GetPosts: "GET_POSTS",
    SetPosts: "SET_POSTS",
    GetSubscriptions: "GET_SEBSCRIPTIONS",
    SetSubscriptions: "SET_SUBSCRIPTIONS",
    GetEngagements: "GET_ENGAGEMENTS",
    SetEngagements: "SET_ENGAGEMENTS",
    GetEngageGraph: "GET_ENGAGE_GRAPH",
    SetEngageGraph: "SET_ENGAGE_GRAPH",
    UpdateSubscription : "UPDATE_SUBSCRIPTION",
    UpdatePosts : "UPDATE_POST",
    UpdatePostsCount : "UPDATE_POSTCOUNT"
  };

  
const initialState = {
    posts: [],
    subscribers: [],
    engages: {},
    egraph: []
  };


  export const preducer = persistReducer(
    { storage, key: "QR-Buzz-[dashboard]", whitelist: ["user", "authToken"] },
    (state = initialState, action) => {
      switch (action.type) {
      
        case actionTypes.SetPosts: { 
          const { posts } = action.payload;
          //console.log(posts);
          return { ...state, posts:posts  };
        }

        case actionTypes.SetSubscriptions: { 
          const subs  = action.payload;
          //console.log(subs);
          return { ...state, subscribers:subs  };
        }

        case actionTypes.SetEngagements: { 
          const engage  = action.payload;
          //console.log(engage);
          return { ...state, engages:engage  };
        }

        case actionTypes.SetEngageGraph: { 
          const eg_states  = action.payload;
          //console.log(eg_states);
          return { ...state, egraph:eg_states  };
        }


        case actionTypes.UpdateSubscription: {

          const newsub = action.payload;

          var subs = [...state.subscribers];
          var tmp = subs.unshift(newsub)

          return {...state, subscribers : subs}

          //return { ...state, subs:eg_states  };
        }
        case actionTypes.UpdatePosts: {

          const newpost = action.payload;

          var posts = [...state.posts];
          var tmp = posts.unshift(newpost)
          
          return {...state, posts : posts}

          //return { ...state, subs:eg_states  };
        }
        case actionTypes.UpdatePostsCount: {
          const posttype = action.payload;
          var engages = state.engages;
          if(posttype == 1) { 
            var posts_count = Number(engages.subscriptions) + 1;
            engages.subscriptions = posts_count;
          } else { 
            var posts_count = Number(engages.posts) + 1;
            engages.posts = posts_count;
          }
          return {...state, engages : engages}
        }

        default:
          return state;
      }
    }
  );
  


export const actions = {
    getPosts : (user_id) => ({type: actionTypes.GetPosts, payload: {user_id}}),
    setPosts : (posts) => ({type: actionTypes.SetPosts, payload: posts}),
    getSubscriptions : (user_id) => ({type: actionTypes.GetSubscriptions, payload: {user_id}}),
    setSubscriptions : (subs) => ({type: actionTypes.SetSubscriptions, payload: subs}),
    getEngagements : (user_id) => ({type: actionTypes.GetEngagements, payload: {user_id}}),
    setEngagements : (engage) => ({type: actionTypes.SetEngagements, payload: engage}),
    getEngageGraph : (user_id) => ({type: actionTypes.GetEngageGraph, payload: {user_id}}),
    setEngageGraph : (egState) => ({type: actionTypes.SetEngageGraph, payload: egState}),
    updateSubscribers : (newsub) => ({type: actionTypes.UpdateSubscription,  payload: newsub}),
    updatePosts : (newpost) => ({type: actionTypes.UpdatePosts,  payload: newpost}),
    updatePostsCount : (posttype) => ({type: actionTypes.UpdatePostsCount,  payload: posttype})
  }


export function* pSaga(){

    yield takeLatest(actionTypes.GetPosts,  function* getPostsSaga(action) {
      //console.log(action.payload);
      try {
          const posts = yield call(getPosts,action.payload)
          //console.log(posts)
          yield put(actions.setPosts(posts.body))
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });  

    yield takeLatest(actionTypes.GetSubscriptions,  function* getSubscriptionsSaga(action) {
      //console.log(action.payload);
      try {
          const posts = yield call(getSubscriptions,action.payload)
          //console.log(posts.body.subscriptions)
          yield put(actions.setSubscriptions(posts.body.subscriptions))
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.GetEngagements,  function* getEngagementsSaga(action) {
      //console.log(action.payload);
      try {
          const engages = yield call(getEngagements,action.payload)
          //console.log(engages)
          yield put(actions.setEngagements(engages.body))
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });

    yield takeLatest(actionTypes.GetEngageGraph,  function* getEngageGraphSaga(action) {
      //console.log(action.payload);
      try {
          const egState = yield call(getEngageGraph,action.payload)
          //console.log(egState)
          yield put(actions.setEngageGraph(egState.body))
      } catch (error) {
          //fire appropriate action in case of error 
      }
    });

}