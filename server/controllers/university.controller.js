import Country from '../models/country.model'
import University from '../models/university.model'
import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from '../helpers/dbErrorHandler'
import mongoose from 'mongoose'

const create = (req, res, next) => {
  const university= new University(req.body)
  university.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "Successfully signed up!"
    })
  })
}
/**
 * Load user and append to req.
 */

const universitiessearch = (req, res) => {
 if(req.body.search.length<3){
   return res.send("sorry! Word should contain atleast three alphabets");
 }
 var repl = req.body.search.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
 var regex = new RegExp(repl, 'i');
 University.aggregate([

   { "$match": {"University":regex} },
   {
     "$lookup": {
         "from": "countries",
         "localField": "Country",
         "foreignField": "_id",
         "as": "resultingTagsArray"
     }
 },
 { "$unwind": "$resultingTagsArray" },
 { "$project": {
   "_id": "$_id",
   "university":"$University"

}}


]).exec(function(err, University){
   if(err){
     res.send(err);
   }
   if(University.length==0){
     res.json({"msg":"not found"});
   }
   else{
     res.json(University);
   }
})

}

const allbids = (req, res)=>{
 University.aggregate([
   { "$unwind": "$TotalBids" },
     {
         "$lookup": {
             "from": "users",
             "localField": "TotalBids.Userid",
             "foreignField": "_id",
             "as": "resultingTagsArray"
         }
     },
     { "$unwind": "$resultingTagsArray" },
     { "$match": {"TotalBids.Userid":mongoose.Types.ObjectId(req.params.userId)} },
     { "$group": {
       "_id": "$resultingTagsArray._id",
         "allbids": {"$push":  { "u_id":"$_id","Name": "$University","bid":"$TotalBids.Bid"} }
   }}
  ]).exec(function(err, allbids){
   res.send(allbids);
  })
}

const deletebid = (req,res)=>{
 University.findOneAndUpdate({ _id :mongoose.Types.ObjectId(req.params.universityId)},
 { $pull: { "TotalBids" : { Userid: mongoose.Types.ObjectId(req.params.userId) } } }, (err) => {
     if (err) {
         return res.status(404).json({ message: 'Error' });
     }
     return res.status(200).json({
         message: 'success'
     });
 }
);
}

const list = (req, res) => {
  

   University.find((err, universities) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    if(universities.length==0){
      return res.send("Not Found");
    }
  
  return res.status(200).send(universities);
    
  })
}


const setLivebid = (req, res)=>{

  University.aggregate([
     
      { "$match": {"_id":mongoose.Types.ObjectId(req.params.universityId)} },
      { "$unwind": "$TotalBids" },
      { "$sort": { "TotalBids.Bid": -1 } },
      { "$limit": 3 },
      { "$group": {
        "_id": "$_id",
        "Bids": {"$push":  { "Userid":"$TotalBids.Userid", "Bid":"$TotalBids.Bid" } }
    }}
 
    
   ]).exec(function(err, result){
   
      if(result.length==0){
        res.json({msg:"not found"})
      }
      else{
        University.findOneAndUpdate(
          { _id: req.params.universityId }, 
          { $push: { LiveBids: result[0].Bids } },
         function (error, success) {
               if (error) {
                   res.send(error);
               } else {
                   res.json({"msg":"Live Bid Updated"});
               }
           }); 
    
      }
   })
}




// const setLivebid = (req, res)=>{

//   University.aggregate([
     
//       { "$match": {"_id":mongoose.Types.ObjectId(req.params.universityId)} },
//       { "$unwind": "$TotalBids" },
     
//       {
//           "$lookup": {
//               "from": "users",
//               "localField": "TotalBids.Userid",
//               "foreignField": "_id",
//               "as": "resultingTagsArray"
//           }
//       },
//       { "$unwind": "$resultingTagsArray" },
//       { "$sort": { "TotalBids.Bid": -1 } },
//       { "$limit": 3 },
//       { "$group": {
//         "_id": "$_id",
//         "Bids": {"$push":  { "Userid":"$TotalBids.Userid", "Bid":"$TotalBids.Bid" } }
//     }}
 
    
//    ]).exec(function(err, result){
   
//       if(result.length==0){
//         res.json({msg:"not found"})
//       }
//       else{
//         University.findOneAndUpdate(
//           { _id: req.params.universityId }, 
//           { $push: { LiveBids: result[0].Bids } },
//          function (error, success) {
//                if (error) {
//                    res.send(error);
//                } else {
//                    res.json({"msg":"Live Bid Updated"});
//                }
//            }); 
    
//       }
//    })
// }






  
const remove = (req, res, next) => {
  
  University.findByIdAndRemove(req.params.universityId, (err, University) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "User successfully deleted",
        id: University._id
    };
    return res.status(200).send(response);
});
}

const editbid=(req,res)=>{
 University.update(
   {_id: mongoose.Types.ObjectId(req.params.universityId), "TotalBids.Userid": mongoose.Types.ObjectId(req.params.userId)},
  {$set: { "TotalBids.0.Bid": req.body.bid}},
  function(err,result){
    res.send({msg: "Updated successfully"});
  }
 )
}

const getsingle= (req, res) => {
  University.aggregate([
     
    { "$match": {"_id":mongoose.Types.ObjectId(req.params.universityId)} },
   
 ]).exec(function(err, University){
    if(err){
      res.send(err);
    }
    if(University.length==0){
      res.json({"msg":"not found"});
    }
    else{
      res.json(University);
    }
 })
}

const userbid= (req, res) => {
  User.aggregate([
     
    { "$match": {"_id":mongoose.Types.ObjectId(req.params.userId)} },
    
  
 ]).exec(function(err, count){
    if(count.length==0){
      return res.json({"msg":"user not found"});
    }
    else{
      if(count[0].bid_preference_count==20){
          res.json({"msg":"sorry! limit for bid exceeded"});
      }
      else{
        University.aggregate([
 
          { "$match": {"_id":mongoose.Types.ObjectId(req.params.universityId)} },
          { "$unwind": "$TotalBids" },
          { "$match": {"TotalBids.Userid":mongoose.Types.ObjectId(req.params.userId)} }
       ]).exec(function(err, result){
      
      if(result.length==0){
        User.findOneAndUpdate({_id :mongoose.Types.ObjectId(req.params.userId)}, {$inc : {'bid_preference_count' : 1}},
        function (error, success) {
          if (error) {
              res.send(error);
          } else {
            var bid = { Userid:mongoose.Types.ObjectId(req.params.userId) , Bid:req.body.bid };
            University.findOneAndUpdate(
              { _id: req.params.universityId }, 
              { $push: { TotalBids: bid } },
             function (error, success) {
                   if (error) {
                       res.send(error);
                   } else {
                       res.json({"msg":"Bid Updated"});
                   }
               }); 
          }
      }); 
      }
      else{
        res.json({"msg":"already bid set"});
      }
      
      
       })
      }
    }
 })
  
 
   
}
const update= (req, res) => {
  University.findByIdAndUpdate(req.params.universityId, req.body, (err, University) => {
   
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  
  })
  const response = {
    message: "User successfully updated",
    id: University._id
};
return res.status(200).send(response);
   
}
const search = (req, res) => {
  if(req.body.search.length<3){
    return res.send({msg: "sorry! Word should contain atleast three alphabets"});
  }
  var repl = req.body.search.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  var regex = new RegExp(repl, 'i'); 

  
  University.aggregate(
    
    [{ "$match": { "University": regex} },
  
    { "$project": {
      "_id": "$_id",
      "Name":"$University"
  }}],
    
  
    function( err, University) {
  
        if(err){
          return res.send(err);
        }
        if(University.length==0){
          return res.send({msg: "Not Found"});
        }
          console.log(University);
      res.send(University) ;
        
    }
  );
}


const pagination = (req,res)=>{
  console.log("in pagination")
  console.log(req.body)
  University.aggregate([
     
    { "$match": {"Country":mongoose.Types.ObjectId(req.params.countryId)} },
  
 ]).exec(function(err, result){
  
   if(err){
     res.send(err);
   }
   else{
     var onepage = parseInt(req.params.onepage);
     var totalIndex = (result.length)/onepage;
    if(Number.isInteger(totalIndex)){
      res.json({msg:totalIndex});
    }
   
     var k = parseInt(totalIndex)+1;
     res.json({msg:k});
   }
  })
}




const getLiveBid = (req,res)=>{
  University.aggregate([
     
    { "$match": {"_id":mongoose.Types.ObjectId(req.params.universityId)} },
    { "$unwind": "$LiveBids" },
    {
                "$lookup": {
                    "from": "users",
                    "localField": "LiveBids.Userid",
                    "foreignField": "_id",
                    "as": "resultingTagsArray"
                }
            },
   { "$unwind": "$resultingTagsArray" },
   {
               "$lookup": {
                   "from": "countries",
                   "localField": "Country",
                   "foreignField": "_id",
                   "as": "resultingTagsArrayy"
               }
           },
  { "$unwind": "$resultingTagsArrayy" },
  
    { "$group": {
      "_id": "$_id",
      "name":  {"$first":"$University"},
      "Country":{"$last":"$resultingTagsArrayy.Name"},
      "Bid": {"$push":{"Agent":"$resultingTagsArray.name","Bid":"$LiveBids.Bid"}} 
  }}
 
  
 ]).exec(function(err, result){
   if(err){
     res.send(err);
}
if(result.length==0){
  res.json({msg:"not Live Bid Found"})
}
else{
  res.send(result);
}
 })
 }


const universitiesList= (req, res) => {

 var i;
var k=0; 
var data=[];
 
  University.aggregate([
    { "$match": {"_id":mongoose.Types.ObjectId(req.params.mixId)} }
    
 ]).exec(function(err, result){
    if(err){
      res.send(err);
    }
    if(result.length==0){
      University.aggregate([
     
        { "$match": {"Country":mongoose.Types.ObjectId(req.params.mixId)} },
        {
          "$lookup": {
              "from": "countries",
              "localField": "Country",
              "foreignField": "_id",
              "as": "resultingTagsArray"
          }
      },
      { "$unwind": "$resultingTagsArray" },
      
        { "$project": {
          "_id": "$_id",
          "Country":"$resultingTagsArray.Name",
          "name":  "$University" ,
          "Bid": "$LiveBids" ,
      }}
      
     ]).exec(function(err, Univer){
       if(err){
         res.send(err);
       }
        if(Univer.length==0){
          res.json({msg : "sorry! data not found"})
        }
        else{
       
         
          for (i = 0; i < Univer.length; i++)  
          { 
         
            if(Univer[i].Bid.length==0){
              data[k]=Univer[i];
         
            k++;
          }
          } 
          University.aggregate([
     
            { "$match": {"Country":mongoose.Types.ObjectId(req.params.mixId)} },
          
            { "$project": {
              "_id": "$_id",
              "name":  "$University" ,
              "Bid": "$LiveBids" ,
          }}
          
         ]).exec(function(err, Univers){
           if(err){
             res.send(err);
           }
            if(Univers.length==0){
              res.json({msg : "sorry! data not found"})
            }
            else{
               
             
              for (i = 0; i < Univers.length; i++)  
              { 
             
                if(Univers[i].Bid.length!=0){
                  console.log(Univers[i],"this")
                  University.aggregate([
     
                    { "$match": {"_id":Univers[i]._id} },
                    { "$unwind": "$LiveBids" },
                    {
                                "$lookup": {
                                    "from": "users",
                                    "localField": "LiveBids.Userid",
                                    "foreignField": "_id",
                                    "as": "resultingTagsArray"
                                }
                            },
                   { "$unwind": "$resultingTagsArray" },
                   {
                               "$lookup": {
                                   "from": "countries",
                                   "localField": "Country",
                                   "foreignField": "_id",
                                   "as": "resultingTagsArrayy"
                               }
                           },
                  { "$unwind": "$resultingTagsArrayy" },
                  
                    { "$group": {
                      "_id": "$_id",
                      "name":  {"$first":"$University"},
                      "Country":{"$last":"$resultingTagsArrayy.Name"},
                      "Bid": {"$push":{"ids":"$resultingTagsArray._id","Agent":"$resultingTagsArray.name","Bid":"$LiveBids.Bid"}} 
                  }}
                 
                  
                 ]).exec(function(err, result){
                   if(err){
                     res.send(err);
                   }
                   console.log(result,"the result");
                  data[k] = result[0];
                    k++;
                 if(k==Univer.length){
                 
                          if(req.body.index==''){
                            return  res.json({data:data,count:k});
                          }
                          else{
                            var onepage = parseInt(req.body.onepage);
                            var d = [];
                            var  index =0 ;
                            var totalIndex = k/onepage;
                            if(Number.isInteger(totalIndex)){
                                        var last = totalIndex;
                                          var ind = parseInt(req.body.index);
                                          if(last!=ind){
                                                
                                                  var end =ind*onepage - 1
                                                  var start = ind*onepage - onepage
                                                for(var o=start;o<=end;o++){
                                                    d[index]=data[o];
                                                    console.log(data[o]);
                                                    index++;
                                                }
                                             
                                              return res.json({data:d,count:k});
                                          }

                                          else{
                                              
                                              
                                                  var start = ind*onepage - onepage
                                                for(var o=start;o<k;o++){
                                                    d[index]=data[o];
                                                    index++;
                                                }
                                            
                                              return res.json({data:d,count:k});
                                          }
                            }
                          else{
                           
                                    var last = parseInt(totalIndex)+1;
                                  
                                    var ind = parseInt(req.body.index);
                                  
                                    if(last==ind){
                                 
                                    
                                        var start = ind*onepage - onepage
                                      for(var o=start;o<k;o++){
                                          d[index]=data[o];
                                          index++;
                                      }
                                    
                                    return  res.json({data:d,count:k});
                                    }

                                   else{
                                   
                                      var end =ind*onepage - 1
                                      var start = ind*onepage - onepage
                                    for(var o=start;o<=end;o++){
                                        d[index]=data[o];
                                        index++;
                                    }
                                    
                                  return res.json({data:d,count:k});   
                                   }
                          }
                          
                          }
                 }
                  
                //here
                })  
              }
              } 
                  
              
           
            
            }//here
            
         })   
          
       
        
        }//here
        
     })
    
  }
    else{
      University.aggregate([
     
        { "$match": {"_id":mongoose.Types.ObjectId(req.params.mixId)} },
       
        { "$unwind": "$LiveBids" },
        {
                    "$lookup": {
                        "from": "users",
                        "localField": "LiveBids.Userid",
                        "foreignField": "_id",
                        "as": "resultingTagsArray"
                    }
                },
       { "$unwind": "$resultingTagsArray" },
       {
                   "$lookup": {
                       "from": "countries",
                       "localField": "Country",
                       "foreignField": "_id",
                       "as": "resultingTagsArrayy"
                   }
               },
      { "$unwind": "$resultingTagsArrayy" },
      
        { "$group": {
          "_id": "$_id",
          "name":  {"$first":"$University"},
          "Country":{"$last":"$resultingTagsArrayy.Name"},
          "Bid": {"$push":{"ids":"$resultingTagsArray._id","Agent":"$resultingTagsArray.name","Bid":"$LiveBids.Bid"}} 
      }}
     
   
      
    ]).exec(function(err, a){
       if (err){
         return res.send(err);
       }
      if(a.length==0){
        res.json({msg:"data not found"});
      }
      else{
        var data = [];
        data = a;
        return  res.json({data:data,count:1});
      }
     })
    }
 })
}





const countrySuggestions = (req, res) => {
  
    if(req.body.country.length<3){
      return res.send("sorry! Word should contain atleast three alphabets");
    }
    var repl = req.body.country.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    var regex = new RegExp(repl, 'i');
   
   
    Country.aggregate(
   
   
      [{ "$match": { "Name": regex} }
      // {"project":{
      //   "id":"$_id",
      //   "name":"$Name"
      // }}
    ],
   
   
      function( err, Country) {
   
       if(Country.length==0){
         return res.send("not Found");
       }
   
       res.send(Country);
   
      }
    );
   }
        
  
  const countryname = (req, res)=>{
   
    University.aggregate([
         { "$match": { "_id":mongoose.Types.ObjectId(req.params.universityId)} },
         {
             "$lookup": {
                 "from": "countries",
                 "localField": "Country",
                 "foreignField": "_id",
                 "as": "resultingTagsArray"
             }
         },
         { "$unwind": "$resultingTagsArray" },
         { "$group": {
           "_id": "$resultingTagsArray.Name"
        
          
       }}
       
      ]).exec(function(err, University){
         res.send(University);
      })
   
   }
        
export default {
  create,
  remove,
  list,
  getsingle,
  update,
  // countrysearch,
  setLivebid,
  search,
  countryname,
  universitiesList,
  userbid,
  universitiessearch,
  countrySuggestions,
  editbid,
  allbids,
  deletebid,
  pagination,
  getLiveBid
}















