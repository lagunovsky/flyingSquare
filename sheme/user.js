var crypt           = require('crypto');
var mongoose        = require('mongoose');

var schemaUser = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  hash: {
    type: String,
    require: true
  },
  salt: {
    type: String,
    require: true
  },
  iteration: {
    type: Number,
    require: true
  }
});

schemaUser.virtual('password')
  .set(function (data) {
    this.salt = String(Math.random());
    this.iteration = parseInt(Math.random() * 10 + 1);
    this.hash = this.getHash(data);
  })
  .get(function () {
    return this.hash;
  });

schemaUser.methods.checkPassword = function(data){
  return this.getHash(data) === this.hash;
};

schemaUser.methods.getHash = function (password) {
  var c = crypt.createHmac('sha1', this.salt);
  for (var i = 0; i < this.iteration; i++)
    c = c.update(password);
  return c.digest('hex');
};

exports.User = mongoose.model('user', schemaUser);