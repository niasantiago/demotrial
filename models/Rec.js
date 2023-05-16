const mongoose = require("mongoose");

const RecSchema = new mongoose.Schema({
  hair: {
    type: String,
  },
  problems: {
    type: Array | String,
  },
  goals: {
    type: Array | String,
  },
  emailStatus: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  sentAt: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Rec", RecSchema);
