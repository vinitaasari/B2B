import mongoose from 'mongoose';
mongoose.set('debug', true);
const StudentSchema = new mongoose.Schema({
  title : String,
  
      firstname : {
          type : String,
          required : "first name is required"
      },
      middlename : String,
      lastname : {
          type : String,
          required : "last name is required"
      },


  mobile_number : {
      type : Number,
      required : "mobile number is required"
  },
  alternate_number : Number,
  email :{
      type : String,
      required : "email is required"
  },
  marital_status : String,
  work_experience : {
      type : String,
      required : "work experience is required"
  },
  
  dob : Date,
  highest_education : String,
  english_proficiency : String,
      address : {
          type : String,
          required : "address is required"
      },
      state : {
          type : String,
          required : "state is required"
      },
      city : {
          type : String,
          required : "city is required"
      },
      pincode : {
          type : Number,
          required : "pincode is required"
      },

       abroad : String,
       refused_visa : String,
       interested_country : String,
       institutes : String,
       campuses : String,
       interested_course : String,
       intake : String,
       payer : String,
       loan : String,
       pte : String,
       enquiry : String,
       status : String,
       
      award : String,
      stream : String,
      major_subject : {
        type : String,
        required : "major subject is required"
      },
      result : {   type : String,
        required : "result is required"
    },
      University : {
          type : String,
        required : "University/Institute is required"
    },
    year_of_passing : String,
    medium : String ,


     marksheet1_Doc : {
         type : String,
         required : "10th marksheet is required"
     },
     marksheet2_Doc :{
        type : String,
        required : "12th marksheet is required"
     },
     Graduation_Doc :String,
     provisional_Doc : String,
     photograph : String,
     SOP : String,
     LOR : String,
     IELTS : String,
     resume : String,
     medical_certificate : String,
    applied_by : mongoose.Schema.Types.ObjectId,

    given_to :[{
        _id:false,
        universityid : mongoose.Schema.Types.ObjectId,
        userid : mongoose.Schema.Types.ObjectId
    }]

})


export default mongoose.model('Student', StudentSchema)