const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }],
  rewardClaimed: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
