//using fixed url for now. you should make a separte file for urls and env for keys
import {API_URL} from "../../../Constants";

// var api= 'https://reqres.in/api/users?page=2'
var api= API_URL + 'api/businesses'
var addapi= API_URL + 'api/businesses/addBusiness'
var addBranchapi = API_URL + 'api/branches/addBranch'
var branchapi = API_URL + 'api/branches'
var getCountriesAPI= API_URL + 'api/home/countries'
var brSubscribersApi= API_URL + 'api/branch_subscribers'
var getBranchApi = API_URL + 'api/branches/getBranch'
var getBusinessApi = API_URL + 'api/businesses/getBusiness'
var updateBranchAddApi = API_URL + 'api/branches/updateBranch'
var deleteBranchApi = API_URL + 'api/branches/deleteBranch'
var banSubscriberApi = API_URL + 'api/branch_subscribers/block_subscriber'
var allBsBranchesApi= API_URL + 'api/branches/userBranches'
var updateBusinessApi = API_URL + 'api/businesses/updateBusiness'
var deleteBusinessApi = API_URL + 'api/businesses/deleteBusiness'
var qrGetImage = API_URL + 'api/branches/getBranch'




export async function getBusinesses(user_id) {
      try {
        const response = await fetch(api,{
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
export async function getBranches1(bs_id) {
  
      try {
        const response = await fetch(branchapi,{
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({business_id:bs_id})
        });  
        const data = await response.json();
        //console.log(data.branches[2].total_subscribers);
        return ({status: response.status, body:data.branches})
       
      } catch (error) {
      console.log(error)
    }

  }

export async function getSubscribers(br_id) {
  
    try {
      const response = await fetch(brSubscribersApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({branch_id:br_id})
      });  
      const data = await response.json();
      //console.log(data);
      return ({status: response.status, body:data.subscribers})
     
    } catch (error) {
    console.log(error)
  }

} 

  export async function AddBusiness(payload) {

  var formData = new FormData();
  
  formData.append('user_id', payload.user_id);
  formData.append('name', payload.name);
  formData.append('type', payload.type );
  formData.append('operating_as',payload.operating_as );
  formData.append('registration_number', payload.registration_number );
  formData.append('register_on',payload.register_on );
  formData.append('office_address',payload.office_address );
  formData.append('image',payload.image.file,payload.image.name);

  //console.log(payload)

  try {
        const response = await fetch(addapi,{
          method:"POST",
          // headers: {
          //   "Content-Type":"multipart/form-data"
          // },
          body: formData
        });  
        const data = await response.json()
        //console.log(data)
        return ({status: response.status, body:data.business_id})
       
      } catch (error) {
        console.log(error)
      }
  }

  export async function addBranch(payload) {
    try {
      const response = await fetch(addBranchapi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(payload)
      });  
      const data = await response.json()
      return ({status: response.status, body:data.businesses})
     
    } catch (error) {
      console.log(error)
    }
}

export async function getAllCountries() {
      try {
        const response = await fetch(getCountriesAPI); 
        const data = await response.json()
        
        return ({status: response.status, body:data.countries})
       
      } catch (error) {
      console.log(error)
    }

  }

  export async function GetBranch(payload) {
    try {
      const response = await fetch(getBranchApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({id:payload})
      });  
      const data = await response.json()
      return ({status: response.status, body:data.branch})
     
    } catch (error) {
      console.log(error)
    }
  }
  export async function GetBusiness(payload) {
    try {
      const response = await fetch(getBusinessApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({id:payload})
      });  
      const data = await response.json()
      return ({status: response.status, body:data.business})
     
    } catch (error) {
      console.log(error)
    }
  }

  export async function updateBranchAddr(br_data) {

    try {
      const response = await fetch(updateBranchAddApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({id:br_data.id, address:br_data.address})
      });  
      const data = await response.json()
  
      //console.log(data.status)
      return ({status: response.status, body:data})
     
    } catch (error) {
      console.log(error)
    }
  }
  export async function deleteBranch(dl_data) {
    //console.log(payload)
    try {
      const response = await fetch(deleteBranchApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({id:dl_data.id, user_id:dl_data.user_id})
      });  
      const data = await response.json()
      //console.log(data)
      return ({status: response.status, body:data.message})
     
    } catch (error) {
      console.log(error)
    }
  }
  
  export async function banSubscriber(sub_data) {
    //console.log(sub_data)
    try {
      const response = await fetch(banSubscriberApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({subscriber_id:sub_data.sub_id, branch_id:sub_data.br_id})
      });  
      const data = await response.json()
      //console.log(data)
      return ({status: response.status, body:data.message})
     
    } catch (error) {
      console.log(error)
    }
  }  

  export async function getBusBranches(user_id) {
    //console.log(user_id)
    try {
      const response = await fetch(allBsBranchesApi,{
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

  export async function updateBusinessAddr(bs_data) {
    //console.log(bs_data)
    try {
      const response = await fetch(updateBusinessApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({id:bs_data.id, office_address:bs_data.office_address})
      });  
      const data = await response.json()
      //console.log(data)
      return ({status: response.status, body:data})
     
    } catch (error) {
      console.log(error)
    }
  }

  export async function deleteBusiness(id) {
    //console.log(id)
    try {
      const response = await fetch(deleteBusinessApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({id:id})
      });  
      const data = await response.json()
      //console.log(data)
      return ({status: response.status, body:data.message})
     
    } catch (error) {
      console.log(error)
    }
  }

  export async function getBranchQR(payload) {
    //console.log(payload)
    try {
      const response = await fetch(qrGetImage,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({id:payload})
      });  
      const data = await response.json()
      //console.log(data.branch[0].qrimage)
      return ({status: response.status, body:data.branch[0].qrimage})
     
    } catch (error) {
      console.log(error)
    }
  }