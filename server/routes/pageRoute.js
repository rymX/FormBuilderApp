const express = require('express');
const router= express.Router();


const Page = require('../models/Page')
// create a Page 
router.post('/' , (req ,res) =>{
 const page = new Page({
     title : req.body.title ,
     link : req.body.link ,
     description : req.body.description ,
 });
  page.save()
  .then(result =>{
      res.status(200).json(result);
  }) 
  .catch((error)=>{
      res.status(500).json({error : error})
  }) 
})
// read all the  Pages
router.get('/', (req,res)=>{
    Page.find()
    .exec()
    .then(result =>{
        return res.status(200).json(result)
    })
    .catch( error =>{
      return  res.status(500).json(error)
    })
})

//update page
//i can add form id later

//Assign form to pages


// delete page 

module.exports = router ;