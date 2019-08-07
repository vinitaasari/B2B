import express from 'express'
import Fi from '../controllers/file.controller'

const router = express.Router()

router.route('/api/fupload')

  .post(Fi.create)

export default router
