const signin = (user) => {
  return fetch('/auth/signin/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

const signout = () => {
  return fetch('/auth/signout/', {
    method: 'GET',
  }).then(response => {
      return response.json()
  }).catch((err) => console.log(err))
}

const isEdysorVerified = () => {
    // if (auth.isAuthenticated()) {
      return fetch('/api/checkpath/5d36e3f6f4bbcb33443c2dbe', {
    method: 'POST',
  }).then(response => {
      return response.json()
  })
  .catch((err) => console.log(err))
  // }
}

export {
  signin,
  signout,
  isEdysorVerified
}
