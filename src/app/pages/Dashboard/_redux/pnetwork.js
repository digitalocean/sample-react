//using fixed url for now. you should make a separte file for urls and env for keys
import {API_URL} from "../../../Constants";

// var api= 'https://reqres.in/api/users?page=2'
var getPostAPI= API_URL + 'api/dashboard/getPosts'
var getSubscriptionsApi = API_URL + 'api/dashboard/getSubscriptions'
var getEngagementsApi = API_URL + 'api/dashboard/getEngagements'
var getEngageGraphApi = API_URL + 'api/dashboard/engageGraph'

export async function getPosts(user_id) {
  //console.log(user_id)
    try {
      const response = await fetch(getPostAPI,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(user_id)
      });  
      const data = await response.json()
      //console.log(data)
      return ({status: response.status, body:data})
     
    } catch (error) {
      console.log(error)
    }
}

export async function getSubscriptions(user_id) {
  //console.log(user_id)
    try {
      const response = await fetch(getSubscriptionsApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(user_id)
      });  
      const data = await response.json()
      //console.log(data)
      return ({status: response.status, body:data})
    } catch (error) {
      console.log(error)
    }
}

export async function getEngagements(user_id) {
  //console.log(user_id)
    try {
      const response = await fetch(getEngagementsApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(user_id)
      });  
      const data = await response.json()
      //console.log(data)
      return ({status: response.status, body:data})
    } catch (error) {
      console.log(error)
    }
}

export async function getEngageGraph(user_id) {
  //console.log(user_id)
    try {
      const response = await fetch(getEngageGraphApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(user_id)
      });  
      const data = await response.json()
      //console.log(data)
      return ({status: response.status, body:data})
    } catch (error) {
      console.log(error)
    }
}

