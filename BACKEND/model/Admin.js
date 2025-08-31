const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminPhone: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true, // ✅ usually admin emails should be unique
  },
  adminPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin', // ✅ useful if you want role-based access later
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
