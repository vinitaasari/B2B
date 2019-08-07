import mongoose from 'mongoose';
mongoose.set('debug', true);
const CountrySchema = new mongoose.Schema({
    Name: String
})


export default mongoose.model('Country', CountrySchema)
