const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  complaintId: String,
  description: String,
  pincode: String,
  submitterWallet: String,
  media: [
    {
      filename: String,
      path: String,
    },
  ],
  status: {
    type: String,
    default: 'Pending',
  },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
