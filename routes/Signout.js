const express=require('express');
const router=express.Router();
const User = require('./connect');
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['%h2&ZHV_j7rPZ@YD', 'C+Pbtn75qaSVzW#D'],
  maxAge:3 * 60 * 60 * 1000
}));
router.get('/',async function(req,res)
{
  req.session=null;
  res.redirect('/main');
});
module.exports=router;
