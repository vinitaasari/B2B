import Notification from '../models/notification.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import User from '../models/user.model'
import Nexmo from 'nexmo'


const create = (req, res) => {
  const note = new Notification(req.body)
  note.save((err,notes)=>{
    if(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    
    }
    else{
    if(true){
      User.aggregate([
   
        { "$match": {"_id":mongoose.Types.ObjectId(req.body.userid)} },
       
     ]).exec(function(err, user){
        if(err){
          res.send(err);
        }
        if(user.length==0){
          res.json({msg:"not found"});
        }
        else{
         
        if(req.body.mobile==1){
          const output = `
          <h3>Hello ${user[0].name}</h3>
          <h3>${req.body.Note}</h3>

          `;
          var transporter = nodemailer.createTransport('smtps://edysorapeksha@gmail.com:apeksha123@smtp.gmail.com/?pool=true');
          let mailOptions = {
            from: '"EDYSOR VERIFICATION" <edysorapeksha@gmail.com>', // sender address
            to: user[0].email, // list of receivers
            subject: 'Verify email', // Subject line
            text: 'Hello'+ user[0].name, // plain text body
            html: output, // html body
           
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            
          });
          const nexmo = new Nexmo({
            apiKey: '6ecaab8d',
            apiSecret: '3VOVb2Qw5FiKMmTX',
          });
          
          const from = 'Nexmo';
          const to = '917737627371';
          const text = req.body.Note;
          
          nexmo.message.sendSms(from, to, text);
             res.json({msg:"notification!"});
         
        }
        }
     })
    }
    }
  })
}








export default 
{
    create
}