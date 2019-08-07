import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
.get(authCtrl.requireSignin, userCtrl.list)
.post(userCtrl.create)

router.route('/api/otpverification/:userId')
.post(authCtrl.requireSignin,userCtrl.verify)

router.route('/api/editnumber/:userId')
.post(authCtrl.requireSignin, userCtrl.editnumber)

router.route('/api/getNotification/:userId')
.post(authCtrl.requireSignin, userCtrl.getNotification)

router.route('/api/newnumber/:userId')
.post(authCtrl.requireSignin, userCtrl.newnumber) 

router.route('/api/verifyNewnumber/:userId')
.post(authCtrl.requireSignin, userCtrl.verifyNewnumber)

router.route('/api/documents/:userId')
.post(authCtrl.requireSignin, userCtrl.upload)

router.route('/api/get/:userId')
.get(authCtrl.requireSignin,userCtrl.getsingle) 

router.route('/api/sendOtp/:userId')
.post(authCtrl.requireSignin, userCtrl.sendOtp)

router.route('/api/checkpath/:userId')
.post(userCtrl.checkpath) 

router.route('/api/std_sugg/:userId')
.post(authCtrl.requireSignin, userCtrl.std_sugg) 

router.route('/api/receive_app/:userId')
.get(authCtrl.requireSignin, userCtrl.receive_app)   

router.route('/api/forgot_password')
.post(userCtrl.forgot_password)  

router.route('/api/verifyNewemail/:userId/:token')
.get(userCtrl.verifyNewemail)  

router.route('/api/new_password/:userId')
.post(userCtrl.new_password)  

router.route('/api/resendOtp/:userId')
.post(authCtrl.requireSignin, userCtrl.otp_resend)    

router.route('/api/path/:userId')
.get(authCtrl.requireSignin, userCtrl.checkpath)

router.route('/api/emailverify/:userId/:token')
.get(userCtrl.emailverify)

router.route('/api/changeemail/:userId')
.post(authCtrl.requireSignin, userCtrl.changeEmail)

router.route('/api/change-password/:userId')
.post(authCtrl.requireSignin, userCtrl.changePassword)

export default router