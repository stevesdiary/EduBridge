// src/routes/progressRoutes.js
const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

// Progress update route
router.post('/update', 
  authMiddleware.authenticate, 
  progressController.updateLessonProgress
);

// Lesson completion route
router.post('/complete', 
  authMiddleware.authenticate, 
  progressController.completeLessonProgress
);

// Get course progress route
router.get('/course/:courseId', 
  authMiddleware.authenticate, 
  progressController.getCourseProgress
);

module.exports = router;
