import express from 'express'
import country from '../controllers/country.controller'

const router = express.Router()

router.route('/api/countries')
  .get(country.list)
  .post(country.create)

router.route('/api/countries/:countryId')
.delete(country.remove)
.get(country.getsingle)
.put(country.update)

router.route('/api/country')
.get(country.search)



export default router
