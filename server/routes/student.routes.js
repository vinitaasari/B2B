import express from 'express'
import StdCtrl from '../controllers/student.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/student/:universityId/:userId1/:userId2')
  .post(authCtrl.requireSignin, StdCtrl.create)


router.route('/api/student_detail/:studentId')
  .get(authCtrl.requireSignin, StdCtrl.student_detail) 
   
export default router
