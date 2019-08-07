
import authCtrl from '../controllers/auth.controller'



import express from 'express'
import uni from '../controllers/extrauniversity.controller'

const router = express.Router()

router.route('/api/extrauniversity')
 .post(authCtrl.requireSignin, uni.AddUniversity)

export default router