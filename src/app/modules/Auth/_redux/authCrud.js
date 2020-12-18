import axios from "axios";
import {API_URL} from "../../../Constants";
import S3FileUpload from 'react-s3';

export const LOGIN_URL = API_URL + "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = "api/me";

var loginApi = API_URL + "api/auth/login";
var forgotPassApi = API_URL + "api/auth/forget_password";
var registerApi = API_URL + "api/auth/register";
var userCountryAPI= API_URL + 'api/home/countries';
var profileUpdateAPI= API_URL + 'api/auth/updateProfile';
var uploadImage = API_URL + "api/userpost/generateSignedURL";
var ResetPassApi = API_URL + "api/auth/passwordUpdate";
var updateProfileImgAPI  = API_URL + "api/auth/updateProfilePhoto";
var getProfileApi = API_URL + "api/auth/profile";
var resetUserPasswordAPI = API_URL + "api/auth/resetPassword";

// export function login(email, password) {
//   return axios.post(LOGIN_URL, { email, password });
// }

export async function login(creds) {
  try {
    const response = await fetch(loginApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({email: creds.email, password: creds.password})
    });  
    const data = await response.json()
    //console.log(data);
    return ({status: response.status, body:data})
  } catch (error) {
    console.log('Auth errr;  ',error)
  }
}

export async function forgotPassword(email) {
  try {
    const response = await fetch(forgotPassApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({email: email.email})
    });  
    const data = await response.json()
    //console.log(data);
    return ({status: response.status, body:data})
  } catch (error) {
    return ({status: null, body:""})
  }
}

export function register(email, fullname, password) {
  return axios.post(REGISTER_URL, { email, fullname, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

export async function getWorldCounties() {
  try {
      const response = await fetch("https://reqres.in/api/users?page=2");  
      const data = await response.json()
      console.log(data)
      return data;
    } catch (error) {
    console.log(error)
  }
}

export async function registerUser(user) {
  //console.log(user)
  try {
    const response = await fetch(registerApi,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name: user.name, email: user.email, password: user.password})
    });  
    const data = await response.json();
    //console.log(data);
    return ({status: response.status, body:data})
   
  } catch (error) {
    console.log(error)
  }
}

export async function userCountries() {
  try {
    const response = await fetch(userCountryAPI); 
    const data = await response.json()
    //console.log(data)
    return ({status: response.status, body:data.countries})
  } catch (error) {
  console.log(error)
}

}

export async function updateProfile(payload) {
//console.log(payload)
try {
  const response = await fetch(profileUpdateAPI,{
    method:"POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(payload)
  });  
  const data = await response.json()
  //console.log(data)
  return ({status: response.status, body:data})
 
  } catch (error) {
    console.log(error)
  }
}

export async function getSignedURL(datas) {
  delete datas.imageBlob;
  try {
    const response = await fetch(uploadImage,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(datas)
    });  
    const data = await response.json()
    //console.log(data)
    return ({status: response.status, body:data})
  } catch (error) {
    console.log(error)
  }
}

export async function uploadProfileImage(data) {
  var formData = new FormData();
  const bucket = "qbamplify28dfd7dbf2d74855b5d33dbe680fccd4113822-dev";
  formData.append('key', 'AKIAULDDK5T4XB26MXNU');
  formData.append('Content-Type', data.imageData.type);
  formData.append('AWSAccessKeyId', '8Kt/jRASLcmToXUqCifn+8oBOzM38kExaW2ubdUm');
  formData.append('acl', 'public-read');
  formData.append('region','us-east-1')
  // formData.append('policy', s3Data.s3Policy);
  formData.append('signature', 'v4');
  formData.append('file', data.imageData);

  var oldFile = data.imageData
  var newFile  = new Blob([oldFile], {type: oldFile.type});
  newFile.name = 'user.jpg';
  newFile.lastModifiedDate = oldFile.lastModifiedDate;
  
  const config = {
    bucketName: bucket ,
    dirName: `public/qbweb/uploads/user/profile/${data.user}/image`, /* optional */
    region: 'us-east-1',
    accessKeyId: 'AKIAULDDK5T4XB26MXNU',
    secretAccessKey: '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',
  }
  try {
    var ress =   await   S3FileUpload.uploadFile(newFile, config)
    return ({status: ress.result.status, body:ress})
  } catch (error) {
    return false
  }

}

  export async function resetPassword(reset) {
    //console.log(reset)
    try {
      const response = await fetch(ResetPassApi,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({remember_token: reset.token, password: reset.password})
      });  
      const data = await response.json();
      console.log(data);
      return ({status: response.status, body:data})
     
    } catch (error) {
      console.log(error)
    }
  }  

  export async function updateProfileImg(imd_data) {
    //console.log(imd_data)
    try {
      const response = await fetch(updateProfileImgAPI,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(imd_data)
      });  
      const img_resp = await response.json()
      //console.log(data)
      return ({status: response.status, body:img_resp})
     
      } catch (error) {
        console.log(error)
      }
    }

    export async function getProfile(user_email) {
      //console.log(user_email)
      try {
        const response = await fetch(getProfileApi,{
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({email:user_email})
        });  
        const data = await response.json()
        //console.log(data)
        return ({status: response.status, body:data})
       
      } catch (error) {
        console.log(error)
      }
    }

  export async function resetUserPassword(reset_pass) {
    //console.log(reset_pass)
    try {
      const response = await fetch(resetUserPasswordAPI,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({user_id: reset_pass.user_id,password: reset_pass.password, new_password: reset_pass.new_password})
      });  
      const data = await response.json();
      //console.log(data);
      return ({status: response.status, body:data})
      
    } catch (error) {
      console.log(error)
    }
  }    
    
