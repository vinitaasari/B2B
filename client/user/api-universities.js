const getUniversitiesNames = (uni) => {
    return fetch('/api/universitiessearch/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(uni)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
  }

  const countryName = (params) => {
    return fetch('/api/getcountryname/'+ params, {
        method: 'POST',
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
  const countrySuggestions = (country, credentials) => {
  return fetch('/api/countrysuggestion/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t        
      },
      body: JSON.stringify({country:country})
    })
    .then((response) => {
        console.log(response)
      return response.json()
    }).catch((err) => console.log(err))
}

const searchData = (params,indexing,credentials) => {
 console.log(indexing,"index")
  return fetch(`/api/searchdata/${params}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t  
      },
      body: JSON.stringify(indexing)
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

  export {
      getUniversitiesNames,
      countryName,
      countrySuggestions,
      searchData
  }