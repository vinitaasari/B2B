import mongoose from 'mongoose';
mongoose.set('debug', true);
const NotificationSchema = new mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
        Note : String,
        path : {
            type : String,
            default : null
        },
        created :{
            type : Date,
            default : Date.now
        }
})

export default mongoose.model('Notification', NotificationSchema)