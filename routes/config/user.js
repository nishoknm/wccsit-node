/**
 * Created by Nishok on 12/19/2015.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
        fName: String,
        lName: String,
        number: String,
        attendee: String,
        comOrg: String,
        sex: String
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
