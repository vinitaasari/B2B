import File from '../models/file.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
import fileUpload from 'express-fileupload'


const create = (req, res) => {
 
  let sampleFile = req.files.myImage;
  console.log(sampleFile,"hh")

  sampleFile.mv('public/uploads/' + req.files.myImage.name, function(err) {
     if (err)
       return res.status(500).send(err);
  
     res.send({'msg' : 'File uploaded!'});
   });
  }
  

export default {
  create
}
