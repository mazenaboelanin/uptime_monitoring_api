const mongoose = require('mongoose');
const userSchema = require('../schemas/user.schema');

const User = mongoose.model("user", userSchema);

module.exports = User;