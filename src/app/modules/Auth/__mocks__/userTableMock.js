import {toAbsoluteUrl} from "../../../../_metronic/_helpers";

export default [
  {
    id: 1,
    username: "admin",
    password: "demo",
    email: "admin@demo.com",
    token: "access-token-8f3ae836da744329a6f93bf20594b5cc",
    refreshToken: "access-token-f8c137a2c98743f48b643e71161d90aa",
    roles: [1], // Administrator
    pic: toAbsoluteUrl("/media/users/sam.jpg"),
    fullname: "Shahbaz Mughal",
    occupation: "CEO",
    companyName: "Hostings House",
    copyRightsLink: "https://www.hostingshouse.com",
    copyRights: "All rights reserved.",
    phone: "456669067890",
    address: {
      addressLine: "L-12-20 Vertex, Cybersquare",
      city: "San Francisco",
      state: "California",
      postCode: "45000"
    },
    socialNetworks: {
      linkedIn: "https://linkedin.com/admin",
      facebook: "https://facebook.com/admin",
      twitter: "https://twitter.com/admin",
      instagram: "https://instagram.com/admin"
    }
  },
  {
    id: 2,
    username: "user",
    password: "demo",
    email: "user@demo.com",
    token: "access-token-6829bba69dd3421d8762-991e9e806dbf",
    refreshToken: "access-token-f8e4c61a318e4d618b6c199ef96b9e55",
    roles: [2], // Manager
    pic: toAbsoluteUrl("/media/users/100_2.jpg"),
    fullname: "Imjaad Haider",
    occupation: "Deputy Head of Keenthemes in New York office",
    companyName: "Keenthemes",
    copyRightsLink: "https://www.mumara.com",
    copyRights: "All rights reserved.",
    phone: "HH",
    address: {
      addressLine: "3487  Ingram Road",
      city: "Greensboro",
      state: "North Carolina",
      postCode: "27409"
    },
    socialNetworks: {
      linkedIn: "https://linkedin.com/user",
      facebook: "https://facebook.com/user",
      twitter: "https://twitter.com/user",
      instagram: "https://instagram.com/user"
    }
  },
  {
    id: 3,
    username: "wasif",
    password: "123456",
    email: "wasif@hostingshouse.com",
    token: "access-token-d2dff7b82f784de584b60964abbe45b9",
    refreshToken: "access-token-c999ccfe74aa40d0aa1a64c5e620c1a5",
    roles: [3], // Guest
    pic: toAbsoluteUrl("/media/users/wasif.jpg"),
    fullname: "Wasif Ahmed",
    occupation: "CEO",
    companyName: "Mumara",
    copyRightsLink: "https://www.mumara.com",
    copyRights: "All rights reserved.",
    phone: "03214242421",
    address: {
      addressLine: "1467  Griffin Street",
      city: "Phoenix",
      state: "Arizona",
      postCode: "85012"
    },
    socialNetworks: {
      linkedIn: "https://linkedin.com/guest",
      facebook: "https://facebook.com/guest",
      twitter: "https://twitter.com/guest",
      instagram: "https://instagram.com/guest"
    }
  }
];
