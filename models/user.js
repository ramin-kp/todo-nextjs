const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  role: {
    type: String,
    required: true,
  },
});

const model = mongoose.models.User || mongoose.model("User", schema);

export default model;
