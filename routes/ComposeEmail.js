const express=require('express');
const router=express.Router();
const bodyParser = require("body-parser");
const User = require('./connect');
const Compose=require('./send');
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['%h2&ZHV_j7rPZ@YD', 'C+Pbtn75qaSVzW#D'],
  maxAge:3 * 60 * 60 * 1000
}));
router.use(bodyParser.urlencoded({extended: true}));
router.get('/',function(req,res){
  res.render('compose');
})
router.post('/sendmail',async function(req,res){
if(typeof(req.session.views)!='undefined')
{
  let json=JSON.parse(req.session.views);
  await User.findOne({email:json.email},async function(err,doc){
    if(!err){
        let compose;
if((typeof(req.body.Field4)!=='undefined' && typeof(req.body.time)!=='undefined') && (req.body.Field4!=='' && req.body.time!==''))
{
  compose=message(Compose[2].both,req,doc);
}
else if(typeof(req.body.Field4)!=='undefined' && req.body.Field4!=='') {
compose=withcc(Compose[2].onlycc,req,doc);
}
else if(typeof(req.body.time)!=='undefined' && req.body.time!=='')
{
compose=withoutcc(Compose[2].onlytime,req,doc);
}
else if((typeof(req.body.time)=='undefined' && typeof(req.body.time)=='undefined') || (req.body.Field4==='' && req.body.time==='')) {
compose=withoutall(Compose[2].onlytime,req,doc);
}
console.log(compose);
if(typeof(compose)!=='undefined')
{
await Compose[0].run(compose,response,json);
res.redirect('/home');
}
else {
res.redirect('/home');
}
//redirect to Home
    }
    else {
      //some error
res.redirect('/main');
    }
  })
}
else {
  //if session expire
res.redirect('/main');
}
});
//full massage
function message(compose,req,doc){
  //data found
  compose.from.name=doc.name;
  compose.personalizations[0].to.push({email:req.body.Field1});
  compose.html=req.body.editor;
  compose.sendAt=Number.isInteger(new Date(req.body.time).getTime()/1000)?(new Date(req.body.time).getTime()/1000):Math.floor(new Date(req.body.time).getTime()/1000);
  compose.personalizations[0].subject=req.body.Field3;
  let arr=req.body.Field4.split(',');
  for(let i=0;i<arr.length;i++)
  {
    compose.personalizations[0].cc.push({email:arr[i]});
  }
  return compose;
}
//with cc massage
function withcc(compose,req,doc)
{
  compose.from.name=doc.name;
  compose.html=req.body.editor;
  compose.personalizations[0].to={email:req.body.Field1};
  compose.personalizations.subject=req.body.Field3;
    compose.sendAt=Number.isInteger(new Date().getTime()/1000)?(new Date().getTime()/1000):Math.floor(new Date().getTime()/1000);
  let arr=req.body.Field4.split(',');
  for(let i=0;i<arr.length;i++)
  {
    compose.personalizations[0].cc.push({email:arr[i]});
  }
  return compose;
}
//with time
function withoutcc(compose,req,doc)
{
compose.from.name=doc.name;
compose.html=req.body.editor;
compose.subject=req.body.Field3;
compose.to=req.body.Field1;
  compose.sendAt=Number.isInteger(new Date(req.body.time).getTime()/1000)?(new Date(req.body.time).getTime()/1000):Math.floor(new Date(req.body.time).getTime()/1000);
  return compose;
}
//without time and cc
function withoutall(compose,req,doc)
{
compose.from.name=doc.name;
compose.html=req.body.editor;
compose.subject=req.body.Field3;
compose.to=req.body.Field1;
//by default time
compose.sendAt=Number.isInteger(new Date().getTime()/1000)?(new Date().getTime()/1000):Math.floor(new Date().getTime()/1000);
return compose;
}
async function response(body,json,massage)
{
  console.log(JSON.stringify(body));
  let code;
if(Array.isArray(body) && typeof(body[0].statusCode)!=='undefined' && body[0].statusCode===202)
{
  //message send sucessfully
code=body[0].statusCode;
}
else {
  //meassage not send
code=(typeof(body.code)!=='undefined'?body.code:(Array.isArray(body))?body[0].statusCode:404);
}
if(typeof(code)!=='undefined')
{
  await User.findOne({email:json.email},async function(err,doc){
  if(!err)
  {
    console.log('[your code is ]',code);
    await User.updateOne({email:json.email}, { $addToSet:{"massagelist":{massage:massage,status:code}}},{"upsert": true,"safe":true}, function(error,doc) {
      if(!error)
      {
        // {massagelist:{"massage":message,"status":code}}
  console.log('record update')
      }
      else {
  console.log('unexpected error');
      }

    });
  console.log(doc);
  }
  else {
  console.log('[err]',err);
  }
  });
}
else {
//body code undefined
}
}
module.exports=router;
