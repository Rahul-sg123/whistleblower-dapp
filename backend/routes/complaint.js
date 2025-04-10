const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// POST complaint
router.post('/', upload.array('media', 3), async (req, res) => {
  try {
    const { description, pincode, submitterWallet } = req.body;
    const complaintId = `CMP-${Math.floor(100000 + Math.random() * 900000)}`;

    const mediaFiles = req.files.map(file => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`
    }));

    const complaint = new Complaint({
      complaintId,
      description,
      pincode,
      submitterWallet,
      media: mediaFiles,
      status: 'Pending'
    });

    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully ✅', complaintId, complaint });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all complaints
router.get('/all', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ _id: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
});

module.exports = router;
