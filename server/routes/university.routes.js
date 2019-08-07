import express from 'express'
import userCtrl from '../controllers/university.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/universities')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/universities/:universityId')
.delete(userCtrl.remove)
.get(userCtrl.getsingle)
.put(userCtrl.update)

router.route('/api/search')
.post(userCtrl.search)



router.route('/api/setLivebid/:universityId')
.get(userCtrl.setLivebid)

// router.route('/api/countryname/:universityId')
// .get(userCtrl.countryname)

router.route('/api/university/:universityId/:userId')
.post( userCtrl.userbid)

router.route('/api/searchdata/:mixId')
.post( userCtrl.universitiesList)

router.route('/api/deletebid/:userId/:universityId')
.post(authCtrl.requireSignin, userCtrl.deletebid)

router.route('/api/allbids/:userId')
.get(authCtrl.requireSignin, userCtrl.allbids)

router.route('/api/editbid/:universityId/:userId')
.post(authCtrl.requireSignin, userCtrl.editbid)

router.route('/api/getLiveBid/:universityId')
.get(authCtrl.requireSignin, userCtrl.getLiveBid)

router.route('/api/countrysuggestion/')
.post(authCtrl.requireSignin, userCtrl.countrySuggestions)

router.route('/api/getcountryname/:universityId')
.post(userCtrl.countryname)

router.route('/api/universitiessearch/')
  .post(userCtrl.universitiessearch) 

export default router