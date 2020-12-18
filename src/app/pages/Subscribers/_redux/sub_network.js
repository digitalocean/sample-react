//using fixed url for now. you should make a separte file for urls and env for keys
import {API_URL} from "../../../Constants";

var allSubscribersApi = API_URL + 'api/branch_subscribers/all'
var allBranchesApi= API_URL + 'api/branches/userBranches'
var brSubscribersApi= API_URL + 'api/branch_subscribers'
var banSubscriberAllApi = API_URL + 'api/branch_subscribers/block_subscriber_all_branches'

export async function getAllSubscribers(s_data) {
  //console.log(s_data)
  try {
    const response = await fetch(allSubscribersApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user_id:s_data.user_id, branch_id: s_data.branch_id})
    });  
    const data = await response.json()
    //console.log(data);
    return ({status: response.status, body:data})
   
  } catch (error) {
    console.log(error)
  }

}

export async function getSubBranches(user_id) {
  try {
    const response = await fetch(allBranchesApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user_id:user_id})
    });  
    const data = await response.json()
    //console.log(data)
    return ({status: response.status, body:data.branches})
   
  } catch (error) {
    console.log(error)
  }
}

export async function getSubscribers2(br_id) {
  //console.log(br_id)
  try {
    const response = await fetch(brSubscribersApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({branch_id:br_id})
    });  
    const data = await response.json();
    //console.log(data.subscribers);
    return ({status: response.status, body:data.subscribers})
   
  } catch (error) {
  console.log(error)
  }
} 

export async function banAllSubscriber(subl_data) {
  //console.log(subl_data)
  try {
    const response = await fetch(banSubscriberAllApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user_id:subl_data.uid, subscriber_id:subl_data.sub_id})
    });  
    const data = await response.json()
    //console.log(data)
    return ({status: response.status, body:data.message})
   
  } catch (error) {
    console.log(error)
  }
}  