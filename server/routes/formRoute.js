const express = require('express');
const router= express.Router();


const Form = require('../models/Form')
// create a form 
router.post('/' , (req ,res) =>{
  const form = new Form({
    inputs : req.body.inputs ,
    title : req.body.title,
  })
  form.save()
  .then(result =>{
      res.status(200).json(result);
  }) 
  .catch((error)=>{
      res.status(500).json({error : error})
  }) 
})
// read form 
router.get('/id/:id', (req,res)=>{
    Form.find({_id : req.params.id})
    .exec()
    .then(result =>{
        return res.status(200).json(result)
    })
    .catch( error =>{
      return  res.status(500).json(error)
    })
})

//update form
//i can update the array of pages later

// delete form 

module.exports = router ;