import mongoose from 'mongoose';
mongoose.set('debug', true);


const FileSchema = mongoose.Schema({
 
   Image: { type: String, required: true }
});


export default mongoose.model('File', FileSchema)