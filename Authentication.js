const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
if (process.env.NODE_ENV !== 'production')
 {
   require('dotenv').config();
   var {SENDGRID_API_KEY,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,CALLBACK_URL,url}={SENDGRID_API_KEY:process.env.SENDGRID_API_KEY,GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,CALLBACK_URL:process.env.CALLBACK_URL,url:process.env.url}
  }
  else {
    var {SENDGRID_API_KEY,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,CALLBACK_URL,url}=require('./production.js');
  }
passport.serializeUser(function(user, done) {
    done(null, user);
  });

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL:CALLBACK_URL,
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
  //  console.log(profile);
    return done(null, profile);
  }
));
