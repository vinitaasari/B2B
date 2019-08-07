import express from 'express'
import Notification from '../controllers/notification.controller'

const router = express.Router()

router.route('/api/notification')
  .post(Notification.create)

export default router
