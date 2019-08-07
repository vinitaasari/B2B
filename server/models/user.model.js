import mongoose, { Mongoose } from 'mongoose'
import crypto from 'crypto'
const randToken = require('rand-token');
const moment = require('moment-timezone');
const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    // unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  alternate_email:String,
  number:{
    type: Number,
  },
 hashed_password: {
    type: String,
    required: "Password is required"
  },
  Profile_picture :{
    type : Buffer
  },
    otp : {
    type    : Number,
    default: 1234
  
  },
  alternate_number : {
    type : Number
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: dateIndia
  },
  activation_token: {
    token : {
      type: String,
    default: function() {
        return randToken.generate(20);
    },
    },
    crat : {
      type: Date,
      default: Date.now
    }
},
emailverified: {
  type: Boolean,
  default: false
},

mobile_verified : {
  type: Boolean,
  default: false
},

edysor_verified : {
  type: Boolean,
  default: false
},

Business_profile :[ {
  _id : false ,
 
  PanNo :  {
    type : String,
    Required : " Pan no is required"
  },
  PanDoc : {
    type:String,
    required : "pan card document required"
  },
  BRNno :{
    type : String,
    Required : " BRN no is required"
  },
  BRNDoc : {
    type:String,
    required : "Brn document required"
  },
  gstDoc : {
    type:String,
    required : "gst document required"
  },
  otherDoc : {
    type:String,
    required : "other document required"
  },
  GSTIN : {
    type : String,
    Required : " GSTIN no is required"
  },
  Other : Number
}],

bid_preference_count :{
 type : Number,
 default : 0
},

LiveBids : [{
  univeristy_id1: mongoose.Schema.Types.ObjectId,
  univeristy_id2: mongoose.Schema.Types.ObjectId,
  univeristy_id3: mongoose.Schema.Types.ObjectId,
}],

applied_students : [{
  _id : false,
  userid : mongoose.Schema.Types.ObjectId,
  universityid : mongoose.Schema.Types.ObjectId,
  student_id : mongoose.Schema.Types.ObjectId
}],

got_students : [{
  _id : false,
  userid : mongoose.Schema.Types.ObjectId,
  universityid : mongoose.Schema.Types.ObjectId,
  student_id : {
    type : mongoose.Schema.Types.ObjectId
  }
}],

Bank_Details :[ {
  _id : false,
  Bank_Name : String,
  Account_No : String,
  IFSC_code : String,
  e_statement : {}
}]

})

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  authenticate: function(plainText) {
    console.log(this.encryptPassword(plainText),"yupp");
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

export default mongoose.model('User', UserSchema)
