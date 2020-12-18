//using fixed url for now. you should make a separte file for urls and env for keys
import {API_URL} from "../../../Constants";

// var api= 'https://reqres.in/api/users?page=2'
var offersApi= API_URL + 'api/offers'
var business2Api= API_URL + 'api/businesses'
var addOfferApi= API_URL + 'api/offers/addOffer'
var addOffersApi= API_URL + 'api/offers/addOffers'
var expireOfferApi= API_URL + 'api/offers/block_offer'
var deleteOfferApi= API_URL + 'api/offers/deleteOffer'
var editOffer = API_URL + 'api/offers/getOffer'
var getBranchesApi= API_URL + 'api/branches'

export async function getOffers(br_id) {
  
  try {
    const response = await fetch(offersApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({branch_id:br_id})
    });  
    const data = await response.json();
    //console.log("Offers Data:  "+data);
    return ({status: response.status, body:data.offers})
   
  } catch (error) {
    console.log(error+" offers error")
  }

} 

export async function getBusinesses22(user_id) {
  //console.log(user_id)
  try {
    const response = await fetch(business2Api,{
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

export async function AddOffer(payload) {
  try {
    const response = await fetch(addOfferApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(payload)
    });  
    const data = await response.json()
    return ({status: response.status, body:data.offers})
   
  } catch (error) {
    console.log(error)
  }
}

export async function AddOffers(payload) {
  console.log(payload)
  try {
    const response = await fetch(addOffersApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(payload)
    });  
    const data = await response.json()
    console.log(data)
    return ({status: response.status, body:data.offers})
   
  } catch (error) {
    console.log(error)
  }
}

export async function ExpireOffer(payload) {

  //console.log(payload)
  try {
    const response = await fetch(expireOfferApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(payload)
    });  
    const data = await response.json()

    //console.log(data)
    return ({status: response.status, body:data.message})
   
  } catch (error) {
    console.log(error)
  }
}

export async function DeleteOffer(payload) {

  //console.log(payload)
  try {
    const response = await fetch(deleteOfferApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(payload)
    });  
    const data = await response.json()

    //console.log(data)
    return ({status: response.status, body:data.message})
   
  } catch (error) {
    console.log(error)
  }
}
export async function EditOffer(payload) {

  //console.log(payload)
  try {
    const response = await fetch(editOffer,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(payload)
    });  
    const data = await response.json()

    //console.log(data)
    return ({status: response.status, body:data.message})
   
  } catch (error) {
    console.log(error)
  }
}

export async function getBranches(bs_id) {
  //console.log(bs_id)
  try {
    const response = await fetch(getBranchesApi,{
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