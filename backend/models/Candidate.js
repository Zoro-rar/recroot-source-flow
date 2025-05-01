
const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  currentPosition: {
    type: String
  },
  currentCompany: {
    type: String
  },
  skills: [{
    type: String
  }],
  experienceYears: {
    type: Number
  },
  resumeUrl: {
    type: String
  },
  linkedInProfile: {
    type: String
  },
  githubProfile: {
    type: String
  },
  portfolio: {
    type: String
  },
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    current: Boolean
  }],
  experience: [{
    company: String,
    position: String,
    description: String,
    startDate: Date,
    endDate: Date,
    current: Boolean
  }],
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'interviewing', 'offered', 'hired', 'rejected'],
    default: 'new'
  },
  source: {
    type: String,
    enum: ['linkedin', 'indeed', 'referral', 'direct', 'other'],
    default: 'other'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create index for search
CandidateSchema.index({ 
  firstName: 'text', 
  lastName: 'text',
  currentPosition: 'text',
  currentCompany: 'text',
  skills: 'text',
  location: 'text'
});

module.exports = mongoose.model('Candidate', CandidateSchema);
