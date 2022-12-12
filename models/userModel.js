const mongoose = require("mongoose");

const userSchema = {
  name: String,
  email: String,
  mobile: String,
  topic: String,
  helptext: String,
  dateAdded: String,
};

const UserData = mongoose.model("user", userSchema);

module.exports = UserData;
