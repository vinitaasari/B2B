import Country from '../models/country.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'


const create = (req, res, next) => {
  const country= new Country(req.body)
  country.save((err, result) => {
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


const list = (req, res) => {
  
console.log("going in list");
  Country.find((err, countries) => {

    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    if(countries.length==0){
      return res.send("not found");
    }
    res.json(countries)
    
  }).select('Name', 'Currency')
}


const remove = (req, res, next) => {
  
  Country.findByIdAndRemove(req.params.countryId, (err, Country) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Country successfully deleted",
        id: Country._id
    };
    return res.status(200).send(response);
});
}





const getsingle= (req, res) => {
  Country.findById(req.params.countryId, (err, Country) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    if(Country.length==0){
      return res.send("not found");
    }
    res.json(Country)
  }).select('name')
}


const update= (req, res) => {



  Country.findByIdAndUpdate(req.params.countryId, req.body, (err, Country) => {
   
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  
  })
  const response = {
    message: "Country successfully updated",
    id: Country._id
};
return res.status(200).send(response);

   
}


const search = (req, res) => {

  if(req.body.country.length<3){
    return res.send("sorry! Word should contain atleast three alphabets");
  }
  var repl = req.body.country.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  var regex = new RegExp(repl, 'i'); 


  agg(
    
    
    [{ "$match": { "Name": regex} }],
  
    function( err, Country) {
  
     if(Country.length==0){
       return res.send("not Found");
     }

     res.send(Country);
  
    }
  );
}


export default {
  create,
 remove,
  list,
  getsingle,
  update,
  search
 
}
