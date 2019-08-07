import Student from '../models/student.model'
import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
import mongoose from 'mongoose'

const create = (req,res,next)=>{
  
  if(req.body.id==null){
    const student= new Student(req.body)
    student.save((err, result) => {
     if (err) {
       return res.status(400).json({
         error: errorHandler.getErrorMessage(err)
       })
     }
   else{
     var user = {universityid : req.params.universityId,userid : req.params.userId2}
    // var std = {universityid : req.params.universityId,student_id : result._id}
     var app = {universityid : req.params.universityId,student_id : result._id,userid:req.params.userId2}
     var got = {universityid : req.params.universityId,student_id : result._id,userid:req.params.userId1}
     Student.findOneAndUpdate(
       { _id:result._id }, 
       { $push: { given_to: user }, applied_by : req.params.userId1},
      function (error, success) {
            if (error) {
                res.send(error);
            } else {
             User.findOneAndUpdate(
               { _id: req.params.userId1}, 
               { $push: { applied_students: app }},
              function (error, success) {
                    if (error) {
                        res.send(error);
                    } else {
                        
                     User.findOneAndUpdate(
                       { _id: req.params.userId2}, 
                       { $push: { got_students: got }},
                      function (error, success) {
                            if (error) {
                                res.send(error);
                            } else {
                                res.json({msg : "student created and applied successfully"})
                            }
                        }); 
     
                    }
                }); 
            }
        }); 
   }
   })
  }
   else{
    Student.aggregate([
       { "$unwind": "$given_to" },
      { "$match": {"_id":mongoose.Types.ObjectId(req.body.id)} },
      { "$match": {"given_to.universityid":mongoose.Types.ObjectId(req.params.universityId)} },
       { "$match": {"given_to.userid":mongoose.Types.ObjectId(req.params.userId2)} }
   ]).exec(function(err, result){
    
          if(err){
           return res.send("Something went wrong");
          }
        if(result.length!=0){
          return res.json({msg : "Student already applied to this agent for same university"});
        }
        else{
          Student.aggregate([
            // { "$unwind": "$given_to" },
           { "$match": {"_id":mongoose.Types.ObjectId(req.body.id)} }
         
        ]).exec(function(err, resu){
         
               if(err){
                return res.send("Something went wrong");
               }
             if(resu.length==0){
               return res.json({msg : "not found"});
             }
             else{
              
          var user = {userid : req.params.userId2}
         // var std = {universityid : req.params.universityId,student_id : req.body.id}
          var app = {universityid : req.params.universityId,student_id : req.body.id,userid:req.params.userId2}
          var got = {universityid : req.params.universityId,student_id : req.body.id,userid:req.params.userId1}
          Student.findOneAndUpdate(
            { _id:req.body.id}, 
            { $push: { given_to: user }},
           function (error, success) {
                 if (error) { 
                     res.send(error);
                 } else {
                  User.findOneAndUpdate(
                    { _id: req.params.userId2}, 
                    { $push: { got_students: got }},
                   function (error, success) {
                         if (error) {
                             res.send(error);
                         } else {
                          User.findOneAndUpdate(
                            { _id: req.params.userId1}, 
                            { $push: { applied_students: app }},
                           function (error, success) {
                                 if (error) {
                                     res.send(error);
                                 } else {
                                     
                                  res.json({msg : "student applied successfully"})
                  
                                 }
                             }); 
          
                         }
                     }); 
        }
        
        })
           }
            })//here
        }
   })

   
  }
  
  }

const student_detail = (req, res, next)=>{
  console.log("in student detail")
  Student.aggregate([
     
    { "$match": {"_id":mongoose.Types.ObjectId(req.params.studentId)} }
    
   
 ]).exec(function(err, result){
    if(err){
      res.send(err);
    }
    if(result.length==0){
      res.json({msg:"data not found"})
    }
    else{
      res.send(result);
    }
  })
}



export default {
  create,
student_detail
}
