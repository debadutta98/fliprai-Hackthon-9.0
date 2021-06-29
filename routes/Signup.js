const express=require('express');
const router = express.Router();
if (process.env.NODE_ENV !== 'production')
 {
   require('dotenv').config();
   var {SENDGRID_API_KEY,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,CALLBACK_URL,url}={SENDGRID_API_KEY:process.env.SENDGRID_API_KEY,GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,CALLBACK_URL:process.env.CALLBACK_URL,url:process.env.url}
  }
  else {
    var {SENDGRID_API_KEY,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,CALLBACK_URL,url}=require('../production.js');
  }
const { v4: uuidv4 } = require('uuid');
const bodyParser = require("body-parser");
const User = require('./connect');
router.use(bodyParser.urlencoded({extended: true}));
router.get('/',function(req,res){
  res.render('signup');
});
const Mail=require('./send');
const otp=uuidv4();
router.post('/newuser',async function(req,res){
await User.findOne({email:req.body.uemail},async function(err,doc){
  if(err===null && doc===null)
  {
    let newInstance=new User({
      name:req.body.uname,
      email:req.body.uemail,
      password:req.body.upass,
      OTP:otp,
        verify:0,
          massagelist:[]
    });
      await newInstance.save(async function(err){
        if(!err)
        {

              //send a verification mail to user
          const massage=Mail[1];
          massage.subject="[Mailer] Please verify your account";
          massage.to=req.body.uemail;
          massage.html=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"xmlns:v="urn:schemas-microsoft-com:vml"xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--><title>meowgun</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0 " /><meta name="format-detection" content="telephone=no"/><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,700,700i,900,900i" rel="stylesheet" /><!--<![endif]--><style type="text/css">body { margin: 0; padding: 0; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important;}img { border: 0 !important; outline: none !important;}p { Margin: 0px !important; Padding: 0px !important;}table { border-collapse: collapse; mso-table-lspace: 0px; mso-table-rspace: 0px;}td, a, span { border-collapse: collapse; mso-line-height-rule: exactly;}.ExternalClass * { line-height: 100%;}.em_blue a {text-decoration:none; color:#264780;}.em_grey a {text-decoration:none; color:#434343;}.em_white a {text-decoration:none; color:#ffffff;}@media only screen and (min-width:481px) and (max-width:649px) {.em_main_table {width: 100% !important;}.em_wrapper{width: 100% !important;}.em_hide{display:none !important;}.em_aside10{padding:0px 10px !important;}.em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}.em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}.em_aside5{padding:0px 10px !important;}.em_ptop2 { padding-top:8px !important; }}@media only screen and (min-width:375px) and (max-width:480px) {.em_main_table {width: 100% !important;}.em_wrapper{width: 100% !important;}.em_hide{display:none !important;}.em_aside10{padding:0px 10px !important;}.em_aside5{padding:0px 8px !important;}.em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}.em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}.em_font_11 {font-size: 12px !important;}.em_font_22 {font-size: 22px !important; line-height:25px !important;}.em_w5 { width:7px !important; }.em_w150 { width:150px !important; height:auto !important; }.em_ptop2 { padding-top:8px !important; }u + .em_body .em_full_wrap { width:100% !important; width:100vw !important;}}@media only screen and (max-width:374px) {.em_main_table {width: 100% !important;}.em_wrapper{width: 100% !important;}.em_hide{display:none !important;}.em_aside10{padding:0px 10px !important;}.em_aside5{padding:0px 8px !important;}.em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}.em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}.em_font_11 {font-size: 11px !important;}.em_font_22 {font-size: 22px !important; line-height:25px !important;}.em_w5 { width:5px !important; }.em_w150 { width:150px !important; height:auto !important; }.em_ptop2 { padding-top:8px !important; }u + .em_body .em_full_wrap { width:100% !important; width:100vw !important;}}</style></head><body class="em_body" style="margin:0px auto; padding:0px;" bgcolor="#efefef"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef"> <tr> <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;"> <tr> <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"> <tr> <td height="25" style="height:25px;" class="em_h20">&nbsp;</td> </tr> <tr> <td align="center" valign="top"><a href="#" target="_blank" style="text-decoration:none;"><img src="https://zohowebstatic.com/sites/default/files/ogimage/mail-logo.png" width="50" height="50" alt="Mailer" border="0" style="display:block; font-family:Arial, sans-serif; font-size:18px; line-height:25px; text-align:center; color:#1d4685; font-weight:bold; max-width:208px;" class="em_w150" /></a></td> </tr> <tr> <td height="28" style="height:28px;" class="em_h20">&nbsp;</td> </tr> </table> </td> </tr> </table> </td> </tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef"> <tr> <td align="center" valign="top" class="em_aside5"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;"> <tr> <td align="center" valign="top" style="padding:0 25px; background-color:#ffffff;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"> <tr> <td height="45" style="height:45px;" class="em_h20">&nbsp;</td> </tr> <tr> <td class="em_blue em_font_22" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 26px; line-height: 29px; color:#264780; font-weight:bold;">Verify your Account</td> </tr> <tr> <td height="14" style="height:14px; font-size:0px; line-height:0px;">&nbsp;</td> </tr> <tr> <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 26px; color:#434343;">Click The button to verify your account</td> </tr> <tr> <td height="26" style="height:26px;" class="em_h20">&nbsp;</td> </tr> <tr> <td align="center" valign="top"><table width="250" style="width:250px; background-color:#6bafb2; border-radius:4px;" border="0" cellspacing="0" cellpadding="0" align="center"> <tr> <td class="em_white" height="42" align="center" valign="middle" style="font-family: Arial, sans-serif; font-size: 16px; color:#ffffff; font-weight:bold; height:42px;"><a href="${process.env.url}/verify?email=${req.body.uemail}&verifyid=${otp}" target="_blank" style="text-decoration:none; color:#ffffff; line-height:42px; display:block;">Confirm</a></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr></table><br><br><br></body></html>`;
        await Mail[0].run(massage,response,{});
                  res.redirect('/');
        }
        else {
          //redirect to signup page again
          res.redirect("/signup");
        }
      });
  }
  else {
    res.redirect("/signup");
  }
})
});
function response(response,json,massage)
{
console.log(response);
}

module.exports=router;
