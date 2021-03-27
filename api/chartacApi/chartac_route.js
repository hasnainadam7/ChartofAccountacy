const express = require('express');
const clsRout = express.Router();

let classes = require('./chartac_modal')

clsRout.route('/addAccount').post(function (req, res) {

  let CLS = new classes(req.body);
  console.log('yes yes')
  console.log(CLS)
  CLS.save()
    .then(jk => {
      res.status(200).json({'Account': 'Account added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


clsRout.route('/addAccountchild').post(function (req, res) {
  var oId = req.body._id

console.log('yes yes reach here',req.body,oId)
  classes.findById(oId, function (err, projDetail){
    if(!projDetail)
    {
      res.status(404).send("data is not found");
    }
     else
    {
      console.log(projDetail,req.body)
      projDetail.children=req.body["children"] 
      projDetail.markModified("children")
      projDetail.save().then(proj => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      })
    }
  
  })


  //   let CLS = new classes(req.body);
//   console.log('yes yes')
//   console.log(CLS)
//   CLS.save()
//     .then(jk => {
//       res.status(200).json({'Account': 'Account added successfully'});
//     })
//     .catch(err => {
//       res.status(400).send("unable to save to database");
//     });
 });

clsRout.route('/').get(function (req, res) {
  console.log('From index') 
  classes.find({}, function(err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

// Defined delete | remove | destroy route
clsRout.route('/delete/:id').get(function (req, res) {
  classes.findByIdAndRemove({_id: req.params.id}, function(err, business){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});


module.exports = clsRout;
