import { signout } from './api-auth.js'
import axios from 'axios'

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined") 
      return false

    if (sessionStorage.getItem('jwt')) 
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  isEdysorVerified() { // still it is returning promise
    if (auth.isAuthenticated()) {
          axios.post(`/api/checkpath/${auth.isAuthenticated().user._id}`)
          .then(res => {
              const ev = res.data.EdysorVerified        
              return ev
          }).then(data => {
            return data
          })
        }    
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },
  signout(cb) {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt')
    cb()
    //optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
  }
}

export default auth
