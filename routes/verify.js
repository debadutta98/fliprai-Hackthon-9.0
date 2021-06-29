const express=require('express');
const router = express.Router();
const User=require('./connect');
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['%h2&ZHV_j7rPZ@YD', 'C+Pbtn75qaSVzW#D'],
  maxAge:3 * 60 * 60 * 1000
}));
require('dotenv').config();
router.get('/',async function(req,res){
  if(typeof(req.query.email)!=='undefined' && typeof(req.query.verifyid)!='undefined')
  {
    await User.findOne({email:req.query.email},async function(err,doc){
      if(!err)
      {
        //user exit
        if(doc.OTP===req.query.verifyid)
        {
          //update verify flag to '1' it means user is verified
    await User.updateOne({email:req.query.email},{$set: {verify:1}},
    {
      "safe": true,
      "upsert": true
    },function(error){
     if(!err)
     {

             //redireact user to main page
             req.session.views = JSON.stringify({email:req.body.uemail,name:doc.name});
                res.redirect('/main');
     }
     else {
//redirect to main page
res.redirect('/');
     }
    });

        }
        else {
          //otp not matched
          res.redirect('/');
        }
      }
      else {
        //user is not exist redireact user to signup page
        res.redirect('/signup');
      }
    });
  }
  else {

  }
});
module.exports=router;
