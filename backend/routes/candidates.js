
const express = require('express');
const { 
  getCandidates, 
  getCandidate, 
  createCandidate, 
  updateCandidate, 
  deleteCandidate,
  searchCandidates,
  uploadResume
} = require('../controllers/candidates');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply protection middleware to all routes in this router
router.use(protect);

router.route('/')
  .get(getCandidates)
  .post(createCandidate);

router.route('/search')
  .get(searchCandidates);

router.route('/upload-resume')
  .post(uploadResume);

router.route('/:id')
  .get(getCandidate)
  .put(updateCandidate)
  .delete(deleteCandidate);

module.exports = router;
