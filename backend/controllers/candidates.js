
const Candidate = require('../models/Candidate');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage for file uploads (temporary local storage until we set up S3/Firebase)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for resumes
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
  }
};

// Set up Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
}).single('resume');

// @desc    Get all candidates
// @route   GET /api/candidates
// @access  Private
exports.getCandidates = async (req, res) => {
  try {
    let query = Candidate.find({ createdBy: req.user.id });

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Candidate.countDocuments({ createdBy: req.user.id });

    query = query.skip(startIndex).limit(limit);

    // Execute query
    const candidates = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: candidates.length,
      pagination,
      data: candidates
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single candidate
// @route   GET /api/candidates/:id
// @access  Private
exports.getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: `No candidate found with id ${req.params.id}`
      });
    }

    // Make sure user is the candidate owner
    if (candidate.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this candidate'
      });
    }

    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create new candidate
// @route   POST /api/candidates
// @access  Private
exports.createCandidate = async (req, res) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const candidate = await Candidate.create(req.body);

    res.status(201).json({
      success: true,
      data: candidate
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update candidate
// @route   PUT /api/candidates/:id
// @access  Private
exports.updateCandidate = async (req, res) => {
  try {
    let candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: `No candidate found with id ${req.params.id}`
      });
    }

    // Make sure user is the candidate owner
    if (candidate.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this candidate'
      });
    }

    candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete candidate
// @route   DELETE /api/candidates/:id
// @access  Private
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: `No candidate found with id ${req.params.id}`
      });
    }

    // Make sure user is the candidate owner
    if (candidate.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this candidate'
      });
    }

    await candidate.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Search candidates
// @route   GET /api/candidates/search
// @access  Private
exports.searchCandidates = async (req, res) => {
  try {
    let { q, skills, location, experience, status, source, page, limit } = req.query;
    
    // Build query
    let query = { createdBy: req.user.id };
    
    // Text search
    if (q) {
      query.$text = { $search: q };
    }
    
    // Filter by skills (comma-separated)
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillsArray };
    }
    
    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // Filter by minimum experience years
    if (experience) {
      query.experienceYears = { $gte: parseInt(experience) };
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by source
    if (source) {
      query.source = source;
    }
    
    // Pagination
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Candidate.countDocuments(query);
    
    // Execute query
    const candidates = await Candidate.find(query)
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }
    
    res.status(200).json({
      success: true,
      count: candidates.length,
      pagination,
      total,
      data: candidates
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Upload resume
// @route   POST /api/candidates/upload-resume
// @access  Private
exports.uploadResume = (req, res) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      // An unknown error occurred when uploading
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
    
    // Everything went fine
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }
    
    // For now, return the file path - in production, this would be a URL to S3/Firebase
    res.status(200).json({
      success: true,
      data: {
        fileName: req.file.filename,
        filePath: `/uploads/${req.file.filename}`
      }
    });
  });
};
