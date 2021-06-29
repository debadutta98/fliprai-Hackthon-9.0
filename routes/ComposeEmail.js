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
let compose=message(Compose[2],req,doc);
console.log(compose);
await Compose[0].run(compose,response,json);
//redirect to Home
res.redirect('/home');
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
function message(compose,req,doc){
  //data found
  compose.from.name=doc.name;
  compose.personalizations[0].to.push({email:req.body.Field1});
  compose.html=req.body.editor;
  try{
    //if user not enter time according to dateime formate so it throws a error
  compose.sendAt=new Date(req.body.time).getTime()/ 1000;
  }
  catch(e)
  {
  //it prtints the error
    console.log(e);
  }
  compose.personalizations[0].subject=req.body.Field3;
  arr=req.body.Field4.split(',');
  for(let i=0;i<arr.length;i++)
  {
    compose.personalizations[0].cc.push({email:arr[i]});
  }
  return compose;
}
async function response(body,json,massage)
{
  console.log(JSON.stringify(body));
  let code;
if(typeof(body[0].statusCode)!=='undefined' && body[0].statusCode===202)
{
  //message send sucessfully
code=body[0].statusCode;
}
else {
  //meassage not send
code=(typeof(body.code)==='undefined'?body[0].statusCode:body.code);
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
// {
//   Field1: 'ewew@gmail.com',
//   Field4: 'dsadasd',
//   Field3: 'dsdss',
//   editor: '<p>dsdsds</p>\r\n',
//   time: '06/28/2021 2:00 AM'
// }
//bimalprasadpanda99@gmail.com,debaduttapanda696@gmail.com
