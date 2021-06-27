const express=require('express');
const router=express().Router();
const bodyParser = require("body-parser");
const User = require('./connect');
router.use(bodyParser.urlencoded({extended: true}));
router.get('/',function(req,res){
  res.render('compose');
})
router.post('/sendmail',function(req,res){
  
});
module.exports=router;
