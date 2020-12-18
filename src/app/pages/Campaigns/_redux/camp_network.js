//using fixed url for now. you should make a separte file for urls and env for keys
import {API_URL} from "../../../Constants";

// var api= 'https://reqres.in/api/users?page=2'
var getAllCampaignsApi= API_URL + 'api/broadcasts'
var deleteCampaignsApi= API_URL + 'api/broadcasts/deleteBroadcast'
var getCampaignDataApi= API_URL + 'api/broadcasts/getBroadcast'
var AddCampaignApi= API_URL + 'api/broadcasts/addBroadcast'
var updateCampaignApi= API_URL + 'api/broadcasts/updateBroadcast'
var getAllScheduleApi= API_URL + 'api/schedules'
var scheduleBusinessApi= API_URL + 'api/businesses'
var getTemplateModuleApi= API_URL + 'api/templates/getTemplateModules'
var getFullTemplateApi= API_URL + 'api/templates/getTemplate'
var getSceduleBranchesApi = API_URL + 'api/branches'
var addScheduleApi = API_URL + 'api/schedules/addCampaign'
var deleteScheduleApi = API_URL + 'api/schedules/deleteCampaign'
var changeScheduleApi = API_URL + "api/schedules/changeStatus"

var getAllStatisticsApi= API_URL + 'api/statistics/'
var getStatisticDataApi= API_URL + 'api/statistics/'

export async function getAllCampaigns(user_id) {
  //console.log(user_id)
  try {
    const response = await fetch(getAllCampaignsApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user_id:user_id})
    });  
    const data = await response.json();
    //console.log("Camp Data:  "+data);
    return ({status: response.status, body:data.broadcasts})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function deleteCampaigns(id) {
  //console.log(id)
  try {
    const response = await fetch(deleteCampaignsApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({id:id})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function getCampaignData(id) {
  //console.log(id)
  try {
    const response = await fetch(getCampaignDataApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({id:id})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function addCampaign(payload) {
  //console.log(payload)
  try {
    const response = await fetch(AddCampaignApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user_id:payload.user_id, name:payload.name, subject:payload.subject, content_html:payload.content_html, content_text:payload.content_text, tid:payload.tid, is_campaign_builder:payload.is_campaign_builder})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function updateCampaign(payload) {
  //console.log(payload)
  //return false
  try {
    const response = await fetch(updateCampaignApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({id:payload.id, name:payload.name, subject:payload.subject, content_html:payload.content_html, content_text:payload.content_text})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function getAllSchedule(user_id) {
 //console.log(user_id)
  try {
    const response = await fetch(getAllScheduleApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user_id:user_id})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data.campaigns})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function scheduleBusiness(user_id) {
  //console.log(user_id)
  try {
    const response = await fetch(scheduleBusinessApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user_id:user_id})
    });  
    const data = await response.json()
    //console.log(data);
    return ({status: response.status, body:data.businesses})
   
  } catch (error) {
    console.log(error)
  }

}

export async function getTemplateModule(id) {
  //console.log(id)
  try {
    const response = await fetch(getTemplateModuleApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name:id})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data.templates})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function getFullTemplate(name) {
  //console.log(name)
  try {
    const response = await fetch(getFullTemplateApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name:name})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data.template})
  } catch (error) {
    console.log(error+" offers error")
  }

}

export async function getSceduleBranches(bs_id) {
  //console.log(bs_id)
  try {
    const response = await fetch(getSceduleBranchesApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({business_id:bs_id})
    });  
    const data = await response.json();
    //console.log(data)
    //console.log(data.branches[2].total_subscribers);
    return ({status: response.status, body:data.branches})
   
  } catch (error) {
  console.log(error)
}

}

export async function addSchedule(payload) {
  //console.log(payload)
  try {
    const response = await fetch(addScheduleApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user_id:payload.user_id, name:payload.name, business_id:payload.business_id, branch_ids:payload.branch_ids, campaign_ids:payload.campaign_ids, status:"scheduled"})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function deleteSchedule(id) {
  //console.log(id)
  try {
    const response = await fetch(deleteScheduleApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({id:id})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function changeSchedule(payload) {
  //console.log(payload)
  try {
    const response = await fetch(changeScheduleApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({id:payload.id, status:payload.status})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function getAllStatistics(user_id) {
  //console.log(user_id)
  try {
    const response = await fetch(getAllStatisticsApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user_id:user_id})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data.campaigns})
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function getStatisticData(id) {
  console.log(id)
  try {
    const response = await fetch(getStatisticDataApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user_id:id})
    });  
    const data = await response.json();
    console.log(data);
    return ({status: response.status, body:data})
  } catch (error) {
    console.log(error+" offers error")
  }

} 