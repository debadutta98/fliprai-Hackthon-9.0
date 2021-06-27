require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const Send = {
  run:async function(massage,callback){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail
      .send(massage)
      .then((body) => {
     callback(body);
      }, error => {
         callback(error);
      });
  }
};
const Massage={
  from: 'debadebaduttapanda.7@yandex.ru',
  subject: "Hello world",
  html: "Welcome to Mailchimp Transactional!",
to: 'serobnic@mail.ru'
};
module.exports=[Send,Massage];
