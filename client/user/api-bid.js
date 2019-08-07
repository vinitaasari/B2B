const getUniversityNames = (name) => {
    return fetch('/api/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name)
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
  }

export {
getUniversityNames
}
