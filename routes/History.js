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
  if(typeof(req.session.views)!='undefined')
  {
    let json=JSON.parse(req.session.views);
    await User.findOne({email:json.email},async function(err,doc){
      if(!err)
      {
        res.render('Home',{json_user:JSON.stringify({mail:doc.massagelist,sign:"<"})});
      }
      else
      {
        res.redirect('/main');
      }
    });
}
else {
  res.redirect('/');
}
});

module.exports=router;
