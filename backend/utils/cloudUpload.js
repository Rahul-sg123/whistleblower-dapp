const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'whistleblower_evidence',
    allowed_formats: ['jpg', 'png', 'mp4', 'mov'],
  },
});

const parser = multer({ storage });

module.exports = { cloudinary, parser };
