if (process.env.NODE_ENV !== 'production')
 {
   require('dotenv').config();
   var {SENDGRID_API_KEY,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,CALLBACK_URL,url}={SENDGRID_API_KEY:process.env.SENDGRID_API_KEY,GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,CALLBACK_URL:process.env.CALLBACK_URL,url:process.env.url}
  }
  else {
    var {SENDGRID_API_KEY,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,CALLBACK_URL,url}=require('../production.js');
  }
const sgMail = require('@sendgrid/mail');

const Send = {
  run:async function(massage,callback,json){
    sgMail.setApiKey(SENDGRID_API_KEY);
    sgMail
      .send(massage)
      .then((body) => {
 callback(body,json,massage);
      }, error => {
   callback(error,json,massage);
      });
  }
};
const Massage={
  from: {email:'debadebaduttapanda.7@yandex.ru',name:'flip.ai'},
  subject: "Hello world",
  html: "Welcome to Mailchimp Transactional!",
to: 'serobnic@mail.ru'
};
const Compose={
  from:{email:'debadebaduttapanda.7@yandex.ru',name:'flip.ai'},
  sendAt:122132,
  html:'html',
  personalizations:[
    {
      to:[

      ],
      cc:[

      ],
      subject:'some subject'
    }
  ]
};
module.exports=[Send,Massage,Compose];
// {
//   "personalizations": [
//     {
//       "to": [
//         {
//           "email": "john_doe@example.com",
//           "name": "John Doe"
//         },
//         {
//           "email": "julia_doe@example.com",
//           "name": "Julia Doe"
//         }
//       ],
//       "cc": [
//         {
//           "email": "jane_doe@example.com",
//           "name": "Jane Doe"
//         }
//       ],
//       "bcc": [
//         {
//           "email": "james_doe@example.com",
//           "name": "Jim Doe"
//         }
//       ]
//     },
//     {
//       "from": {
//         "email": "sales@example.com",
//         "name": "Example Sales Team"
//       },
//       "to": [
//         {
//           "email": "janice_doe@example.com",
//           "name": "Janice Doe"
//         }
//       ],
//       "bcc": [
//         {
//           "email": "jordan_doe@example.com",
//           "name": "Jordan Doe"
//         }
//       ]
//     }
//   ],
//   "from": {
//     "email": "orders@example.com",
//     "name": "Example Order Confirmation"
//   },
//   "reply_to": {
//     "email": "customer_service@example.com",
//     "name": "Example Customer Service Team"
//   },
//   "subject": "Your Example Order Confirmation",
//   "content": [
//     {
//       "type": "text/html",
//       "value": "<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>"
//     }
//   ],
//   "attachments": [
//     {
//       "content": "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==",
//       "filename": "index.html",
//       "type": "text/html",
//       "disposition": "attachment"
//     }
//   ],
//   "categories": [
//     "cake",
//     "pie",
//     "baking"
//   ],
//   "send_at": 1617260400,
//   "batch_id": "AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl",
//   "asm": {
//     "group_id": 12345,
//     "groups_to_display": [
//       12345
//     ]
//   },
//   "ip_pool_name": "transactional email",
//   "mail_settings": {
//     "bypass_list_management": {
//       "enable": false
//     },
//     "footer": {
//       "enable": false
//     },
//     "sandbox_mode": {
//       "enable": false
//     }
//   },
//   "tracking_settings": {
//     "click_tracking": {
//       "enable": true,
//       "enable_text": false
//     },
//     "open_tracking": {
//       "enable": true,
//       "substitution_tag": "%open-track%"
//     },
//     "subscription_tracking": {
//       "enable": false
//     }
//   }
// }
