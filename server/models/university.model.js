import mongoose from 'mongoose';
mongoose.set('debug', true);
const UniversitySchema = new mongoose.Schema({
    University: String,
    Country: mongoose.Schema.Types.ObjectId,
    TotalBids : [{
    	_id : false,
        Userid : mongoose.Schema.Types.ObjectId,
        Bid : Number
    }],
    LiveBids : [{
        _id : false,
        Userid : mongoose.Schema.Types.ObjectId,
        Bid : Number
    }]
    
})

export default mongoose.model('University', UniversitySchema)