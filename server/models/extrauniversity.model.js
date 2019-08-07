// import mongoose from 'mongoose';
import mongoose, { Mongoose } from 'mongoose'
import crypto from 'crypto'
// mongoose.set('debug', true);
const ExtraUniversitySchema = new mongoose.Schema({
  universityName : {
      type : String,
      required : "please enter the name of university"
  },

  universityCountry : {
      type : String,
      required : "please enter the name of country"
  },

  universityPhone : String,
  universityEmail : String,
  universityAddress : String
})

export default mongoose.model('ExtraUniversity', ExtraUniversitySchema)
