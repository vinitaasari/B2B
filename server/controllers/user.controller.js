import User from '../models/user.model'
import Notification from '../models/notification.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import config from './../../config/config'


const Nexmo = require('nexmo');
 const randToken = require('rand-token');

const create = (req, res, next) => {

  const user = new User(req.body)

  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
   else{
    const token = jwt.sign({
      _id: result._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })
    const output = `
    <h3>Hello ${result.name}</h3>
    <h3>your token ${result.activation_token.token}</h3>
    <form action="http://localhost:3000/api/emailverify/${result._id}/${result.activation_token.token}" method="get">
  <button type="submit"  class="btn-link">Verify</button>
 </form>
    `;
    var transporter = nodemailer.createTransport('smtps://edysorapeksha@gmail.com:apeksha123@smtp.gmail.com/?pool=true');
    let mailOptions = {
      from: '"EDYSOR VERIFICATION" <edysorapeksha@gmail.com>', // sender address
      to: result.email, // list of receivers
      subject: 'Verify email', // Subject line
      text: 'Hello'+ result.name, // plain text body
      html: output, // html body
      createdAt: { type: Date, expires: '2m', default: Date.now }
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      return res.json({
        token,
        user: {_id: result._id, name: result.name, email: result.email}
      })
  
    });
   }
  })
 }



const changeEmail= (req, res) => {
 var newtoken= randToken.generate(20);
 var date = Date.now();
 var tok = {token : newtoken,crat : date}

 User.aggregate(
    
  [
  { "$match": { "_id": mongoose.Types.ObjectId(req.params.userId)} },
  { "$match": { "email": req.body.newemail} }  
  ],

  function( err, o) {
      if(err){
        res.send(err);
      }
      if(o.length!=0){
        return res.json({
          msg : "Sorry! your new email should be different from previous"
        })
      }
      else{
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {activation_token : tok,alternate_email: req.body.newemail},
         function (error, success) {
               if (error) {
                   res.send(error);
               } else {
                User.aggregate(
                  [
                  { "$match": { "_id": mongoose.Types.ObjectId(req.params.userId)} }
                  ],
                  function(err,result){
                    if(err){
                      res.send(err);
                    }
                    else{
                      const output = `
                      <h3>Hello ${result[0].name}</h3>
                      <h3>your token ${result[0].activation_token.token}</h3>
                      <form action="http://localhost:3000/api/verifyNewemail/${result[0]._id}/${result[0].activation_token.token}" method="get">
                    <button type="submit"  class="btn-link">Verify</button>
                  </form>
                      `;
                      var transporter = nodemailer.createTransport('smtps://edysorapeksha@gmail.com:apeksha123@smtp.gmail.com/?pool=true');
                      let mailOptions = {
                        from: '"EDYSOR" <edysorapeksha@gmail.com>', // sender address
                        to: result[0].alternate_email, // list of receivers
                        subject: 'EMAIL VERIFICATION', // Subject line
                        text: 'Hello'+ result[0].name, // plain text body
                        html: output // html body
                      };
                      transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                      });
                      return res.json({
                        msg: "email updated"
                      })
                    }
                  }
                );
               }
           });
      }
    })
}

const changePassword= (req, res) => {
  User.findOne({
    "_id": req.params.userId
  }, (err, user) => {
    if (err || !user){
      return res.status('401').json({
        error: "User not found"
      })}

    if (!user.authenticate(req.body.oldpassword)) {
      return res.status('401').send({
        error: "your old password is wrong"
      })
    }
    else{
      if(req.body.password == req.body.oldpassword){
        return res.status('401').send({
          error: "old password and new password should be different"
        })
      }
      else{
       var k=user.encryptPassword(req.body.password);
          user.update({
            hashed_password:k
          },(err,result)=>{
              if (err){
                return res.status('401').send({
                  error: "Something went wrong"
                })
              }
              else{
                return res.status('200').send({
                  msg: "Successfully updated password"
                })
              }
          })
        
      }
    }
  })
}

// updated this API
const checkpath= (req, res, next) => {
  User.aggregate(
    [
    { "$match": { "_id": mongoose.Types.ObjectId(req.params.userId)} }
    ],
    function( err, o) {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      if(o[0].mobile_verified==false){
       
        return res.json({path:"/otp-verification",EdysorVerified : false});
      }
      if(o[0].Business_profile.length==0){
        
        return res.json({path:"/business-profile",EdysorVerified : false});
      }
      if(o[0].emailverified==false){
        
        return res.json({path:"/not-verified",msg:"email not verified",EdysorVerified : false});
      }
      if(o[0].edysor_verified==false){
        
        return res.json({path:"/not-verified",msg:"not verified by edysor",EdysorVerified : false});
      }
      else{
        
        return res.json({path:"/dashboard",EdysorVerified : true});
      }
    }
  )
 }

const upload = (req, res, next) => {

  if(req.body.panno===''){
    return res.json({msg : "panno is required"})
  }
 
  if(req.body.gstin===''){
    return res.json({msg : "gstin is required"})
  }
  if(req.body.brnno===''){
    return res.json({msg : "brnno is required"})
  }
  if(req.body.other===''){
    return res.json({msg : "other is required"})
  }
  
  let sampleFile1 = req.files.PanDoc;
  let sampleFile2 = req.files.BRNDoc;
  let sampleFile3 = req.files.gstDoc;
  let sampleFile4 = req.files.otherDoc

  sampleFile1.mv('public/uploads/' + req.files.PanDoc.name, function(err) {
     if (err)
       return res.status(500).send(err);
   });
   sampleFile2.mv('public/uploads/' + req.files.BRNDoc.name, function(err) {
    if (err)
      return res.status(500).send(err);
  });
  sampleFile3.mv('public/uploads/' + req.files.gstDoc.name, function(err) {
    if (err)
      return res.status(500).send(err);
  });
  sampleFile4.mv('public/uploads/' + req.files.otherDoc.name, function(err) {
    if (err)
      return res.status(500).send(err);
  });
  var data = { otherDoc:'public/uploads/' + req.files.otherDoc.name,gstDoc:'public/uploads/' + req.files.gstDoc.name ,PanDoc : 'public/uploads/' + req.files.PanDoc.name,BRNDoc:'public/uploads/' + req.files.BRNDoc.name,Other:req.body.other, PanNo:req.body.panno, BRNno:req.body.brnno, GSTIN:req.body.gstin };

  User.findOneAndUpdate(
    { _id: req.params.userId }, 
    { $push: { Business_profile: data } },
   function (err, success) {
         if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
         } else {
             res.send({msg: "uploaded"});
         }
     }); 
  }

  const verify = (req, res, next) => {
    var reg = parseInt(req.body.otp)
    console.log(reg,"the otp");
    console.log(req.params.userId,"the id")
    
        User.aggregate(
    
          [
          { "$match": { "_id": mongoose.Types.ObjectId(req.params.userId)} },
          { "$match": { "otp": reg} }  
          ],
        
          function( err, o) {
        
            if (err) {
              return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
              })
            }
    
            if(o.length==0){
              return res.status(400).json({
                error : true
              })
            }
           else{
            User.findOneAndUpdate(
              { _id: req.params.userId },
              { mobile_verified:true,  otp : undefined },
             function (error, success) {
                   if (error) {
                      res.send(error);
                   } else {
                      res.json({"msg":"verified"});
                   }
               });
           }
          }
        ); 
    }


    const verifyNewnumber = (req, res, next) => {
      var reg = parseInt(req.body.otp)
      
          User.aggregate(
      
            [
            { "$match": { "_id": mongoose.Types.ObjectId(req.params.userId)} },
            { "$match": { "otp": reg} }  
            ],
          
            function( err, o) {
          
              if (err) {
                return res.status(400).json({
                  error: errorHandler.getErrorMessage(err)
                })
              }
              if(o.length==0){
                return res.status(400).json({
                  error : true
                })
              }
             else{
            
          User.aggregate(
      
            [
            { "$match": { "_id": mongoose.Types.ObjectId(req.params.userId)} },
            ],
          
            function( err, out) {
          
              if (err) {
                return res.status(400).json({
                  error: errorHandler.getErrorMessage(err)
                })
              }
              else{
                User.findOneAndUpdate(
                  { _id: req.params.userId },
                  { number : out[0].alternate_number },
                 function (error, success) {
                       if (error) {
                           res.send(error);
                       } else {
                        
                           res.json({msg:"new number updated and verified"});
                       }
                   });
              }
            })
             }
            }
          ); 
      }
  
      const verifyNewemail = (req,res,next)=>{
        User.aggregate(
    
          [
          { "$match": { "_id": mongoose.Types.ObjectId(req.params.userId)} },
          { "$match": { "activation_token.token": req.params.token} }  
          ],
        
          function( err, o) {
        
            if (err) {
              return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
              })
            }
            if(o.length==0){
              return res.status(400).json({
                msg : "Sorry! activation token is wrong"
              })
            }
           else{
          
        User.aggregate(
    
          [
          { "$match": { "_id": mongoose.Types.ObjectId(req.params.userId)} },
          ],
        
          function( err, out) {
        
            if (err) {
              return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
              })
            }
            else{
              User.findOneAndUpdate(
                { _id: req.params.userId },
                { email : out[0].alternate_email },
               function (error, success) {
                     if (error) {
                         res.send(error);
                     } else {
                      
                         res.json({msg:"new email verified and updated"});
                     }
                 });
            }
          })
           }
          }
        ); 
      }








    const emailverify = (req, res, next) => {
 
 
      User.aggregate(
        [
        { "$match": { "_id": mongoose.Types.ObjectId(req.params.userId)} },
        { "$match": { "activation_token.token": req.params.token} }
        ],
   
        function( err, o) {
   
          if (err) {
            return res.status(400).json({
              error: errorHandler.getErrorMessage(err)
            })
          }
          if(o.length==0){
            return res.status(400).json({
              error : true
            })
          }
         else{
   User.findOneAndUpdate(
      { _id: req.params.userId },
      { emailverified:true },
     function (error, success) {
           if (error) {
               res.send(error);
           } else {
               res.json({msg:"verified"});
           }
       });
   
         }
        }
      );
    }
  
  
const editnumber= (req, res) => {
  var newotp = Math.floor(Math.random()*9030) + 1000
  User.findOneAndUpdate(
    { _id: req.params.userId }, 
    { number: req.body.number, otp : newotp },
   function (error, success) {
         if (error) {
             res.send(error);
         } else {
             res.json({"msg":"number updated"});
         }
     }); 
}

const newnumber = (req, res)=>{
  var newotp = Math.floor(Math.random()*9030) + 1000
  var reg = parseInt(req.body.newnumber)
  User.findOneAndUpdate(
    { _id: req.params.userId }, 
    { alternate_number: reg, otp : newotp },
   function (error, success) {
         if (error) {
             res.send(error);
         } else {
             res.json({msg:"taken new number"});
         }
     }); 
}

const sendOtp = (req, res)=> {
  var Otp = Math.floor(Math.random()*9030) + 1000
  User.findOneAndUpdate(
    { _id: req.params.userId }, 
    { otp: Otp },
   function (error, success) {
         if (error) {
             res.send(error);
         } else {
          const nexmo = new Nexmo({
            apiKey: '5256877c',
            apiSecret: 'sIVNz89QxPk04TvS',
          });
          
          const from = 'Nexmo';
          const to = '918559872296';
          const text = Otp;
          
          nexmo.message.sendSms(from, to, text);
             res.json({msg:"otp sent!"});
         }
     }); 

}


const getNotification= (req, res) => {
  User.aggregate([
     
    { "$match": {"_id":mongoose.Types.ObjectId(req.params.userId)} },
    {
      "$lookup": {
          "from": "notifications",
          "localField": "_id",
          "foreignField": "userid",
          "as": "resultingTagsArray"
      }
  },
  { "$unwind": "$resultingTagsArray" },
  { "$project": {
   
    "notification":  "$resultingTagsArray.Note",
    "path":"$resultingTagsArray.path",
      "time":"$resultingTagsArray.created"

}}
   
 ]).exec(function(err, notes){
    if(err){
      res.send(err);
    }
    if(notes.length==0){
      res.json({msg:"SORRY! No Notifications Found"});
    }
    else{
      res.json(notes);
    }
 })
}

const getsingle= (req, res) => {
  User.aggregate([
     
    { "$match": {"_id":mongoose.Types.ObjectId(req.params.userId)} },
   
 ]).exec(function(err, user){
    if(err){
      res.send(err);
    }
    if(user.length==0){
      res.json({"msg":"not found"});
    }
    else{
      res.json(user);
    }
 })
}


const otp_resend= (req, res) => {
  var newotp = Math.floor(Math.random()*9030) + 1000
  User.findOneAndUpdate(
    { _id: req.params.userId }, 
    {  otp : newotp },
   function (error, success) {
         if (error) {
             res.send(error);
         } else {
             res.json({msg:"resended the otp"});
         }
     }); 
   
}





const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(users)
  })
}


const std_sugg = (req, res, next)=>{
  console.log("in std sugg")
  console.log(req.body)
  if(req.body.search.length<3){
    return res.send({msg: "sorry! Word should contain atleast three alphabets"});
  }
  var repl = req.body.search.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  var regex = new RegExp(repl, 'i');
  User.aggregate([
     
    { "$match": {"_id":mongoose.Types.ObjectId(req.params.userId)} },
    { "$unwind": "$applied_students" },
    {
        "$lookup": {
            "from": "students",
            "localField": "applied_students.student_id",
            "foreignField": "_id",
            "as": "resultingTagsArray"
        }
    },
    { "$unwind": "$resultingTagsArray" },
    { "$match": {"resultingTagsArray.firstname":regex} },
    { "$project": {
      "_id": "$resultingTagsArray._id",
      "name":  "$resultingTagsArray.firstname"
  }}
  
 ]).exec(function(err, students){
   if(err){
     return res.send(err);
   }
    if(students.length==0){
     return res.json({msg : "sorry! data not found"})
    }
    else{
      res.send(students);
    }
  })
}

const receive_app = (req,res,next)=>{
  User.aggregate([
     
    { "$match": {"_id":mongoose.Types.ObjectId(req.params.userId)} },
    { "$unwind": "$got_students" },
    {
        "$lookup": {
            "from": "students",
            "localField": "got_students.student_id",
            "foreignField": "_id",
            "as": "resultingTagsArray"
        }
    },
    { "$unwind": "$resultingTagsArray" },
    {
      "$lookup": {
          "from":"users",
          "localField": "got_students.userid",
          "foreignField": "_id",
          "as": "resultingTagsArrayy"
      }
  },
    { "$unwind": "$resultingTagsArrayy" },
    {
      "$lookup": {
          "from":"universities",
          "localField": "got_students.universityid",
          "foreignField": "_id",
          "as": "resultingTagsArrayyy"
      }
  },
    { "$unwind": "$resultingTagsArrayyy" },
    { "$project": {
      "_id": "$_id",
      "University": "$resultingTagsArrayyy.University" ,
      "Agent": "$resultingTagsArrayy.name",
      "student_name": "$resultingTagsArray.firstname",
      "Address": "$resultingTagsArray.address",
      "City": "$resultingTagsArray.city",
      "mobile": "$resultingTagsArray.mobile_number",
      "state": "$resultingTagsArray.state",
      "title": "$resultingTagsArray.title",
      "work_experience": "$resultingTagsArray.work_experience",
      
       
  }}
  
 ]).exec(function(err, data){
   if(err){
     res.send(err);
   }
    if(data.length==0){
      res.json({msg : "sorry! data not found"})
    }
    else{
      res.send(data);
    }
  })
}


const forgot_password = (req,res,next)=>{
  User.aggregate([
     
    { "$match": {"email":req.body.email} }
 ]).exec(function(err, data){
   if(err){
     res.send(err);
   }
    if(data.length==0){
      res.json({msg : "sorry! your email is not linked with edysor"})
    }
    else{
      const output = `
      <h3>Hello ${data[0].name}</h3>
      <h3>Click on the button below to change password</h3>
      <form action="http://localhost:3000/newpassword/${data[0]._id}" method="get">
    <button type="submit"  class="btn-link">Change Password</button>
  </form>
      `;
      var transporter = nodemailer.createTransport('smtps://edysorapeksha@gmail.com:apeksha123@smtp.gmail.com/?pool=true');
      let mailOptions = {
        from: '"EDYSOR " <edysorapeksha@gmail.com>', // sender address
        to: data[0].email, // list of receivers
        subject: 'CHANGE PASSWORD', // Subject line
        text: 'Hello'+ data[0].name, // plain text body
        html: output // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else{
          console.log("EMAIL SENT")
        }
      });
      res.json({msg:"email has been to your given email id"})
 
    }
  })
}

const new_password = (req,res,next)=>{
  User.findOne({
    "_id": req.params.userId
  }, (err, user) => {
   
    if (err || !user){
      return res.status('401').json({
        error: "User not found"
      })}
      else{
        var k=user.encryptPassword(req.body.newpassword);
        user.update({
          hashed_password:k
        },(err,result)=>{
            if (err){
              return res.status('401').send({
                error: "Something went wrong"
              })
            }
            else{
              return res.status('200').send({
                msg: "Successfully updated password"
              })
            }
        })
      
      }
   
    
  })

    }
  

export default {
  create,
  list,
  verify,
  editnumber,
  emailverify,
  upload,
  checkpath,
  changeEmail,
  changePassword,
  otp_resend,
  sendOtp,
  newnumber,
  verifyNewnumber,
  std_sugg,
  receive_app,
  forgot_password,
  new_password,
  verifyNewemail,
  getsingle,
  getNotification
 
}

