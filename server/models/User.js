
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userId: { type: String, default: "09876" },
  name: { type: String, default: "Carlos" },
  email: { type: String, default: "test@example.com" }
});

module.exports = mongoose.model('User', UserSchema);

