import ExtraUniversity from '../models/extrauniversity.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
import mongoose from 'mongoose'


const AddUniversity = (req, res) => {
   console.log("in controller");
 const extra= new ExtraUniversity(req.body)
 extra.save((err, result) => {
   if (err) {
     return res.status(400).json({
       error: errorHandler.getErrorMessage(err)
     })
   }
   res.status(200).json({
     message: "Successfully added!"
   })
 })
}

/**
* Load user and append to req.
*/


const list = (req, res) => {

 ExtraUniversity.find((err, extra) => {

   if (err) {
     return res.status(400).json({
       error: errorHandler.getErrorMessage(err)
     })
   }
   if(extra.length==0){
     return res.send("not found");
   }
   res.json(extra)

 }).select('Name')
}

export default {
 AddUniversity,
 list
}