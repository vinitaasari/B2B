
const create = (user) => {
  return fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

const ReceiveApplication = (params) => {
  console.log("receive api")
  console.log(params)
  return fetch(`/api/receive_app/${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

const list = () => {
  return fetch('/api/users/', {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

const read = (params, credentials) => {
  return fetch('/api/users/' + params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const update = (params, credentials, user) => {
  return fetch('/api/users/' + params.userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(user)
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const remove = (params, credentials) => {
  return fetch('/api/users/' + params.userId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const otpverification = (params,otp) =>
{
  console.log(params,otp,"pai")
  
  return fetch('/api/otpverification/'+ params.userId,
  {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(otp)
  })
  .then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const Suggestion = (params,search,credentials) =>
{

  return fetch('/api/std_sugg/'+params,
  {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify({search:search})
  })
  .then((response) => {
   
    return response.json()
  }).catch((err) => console.log(err))
}

const upload = (params,doc) =>
{
  return fetch('/api/documents/'+params,
  {
    method:'POST',
    body: JSON.stringify(doc),
   
  })
  .then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}


const otp_resend = (params) =>
{

  return fetch('/api/resendOtp/'+params.userId,
  {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  })
  .then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const editnumber = (params,newnumber) =>
{
  return fetch('/api/editnumber/'+ params.userid,
  {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newnumber)
  })
  .then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

export {
  create,
  list,
  read,
  update,
  remove,
  otpverification,
  editnumber,
  upload,
  otp_resend,
  Suggestion,
  ReceiveApplication
}
