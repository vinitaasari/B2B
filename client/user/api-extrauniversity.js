const AddUniversity = (user) => {
  console.log(JSON.stringify(user));
  return fetch('/api/extrauniversity', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((response) => {
      console.log(response)
      return response.json()
    }).catch((err) => console.log(err))
}

export {
  AddUniversity
}