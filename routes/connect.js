const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
mongoose.connect('mongodb+srv://debadutta_91:DBP123.,@cluster0.oe2fs.mongodb.net/User?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true});
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function() {
  console.log("Successfully connected to MongoDB!");
});
var user_table=new mongoose.Schema({
  name:
  {
    type:String,
    required:true
  },
  email:
  {
    type:String,
    required:true
  },
  password:
  {
    type:String,
    require:true
  },
  verify:
  {
    type:Number,
    require:true
  },
  OTP:
  {
    type:String
  },
  massagelist:
  [
    {
      _id:{
         type : mongoose.Schema.Types.ObjectId,
         auto: true
      },
      massage:{
        type:Object
      },
      status:{
        type:Number
      }
    }
  ]
});
user_table.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

user_table.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports =mongoose.model("User",user_table);
