// const Progress = require('../models/Progress');
// const Lesson = require('../models/Lesson');
// const Enrollment = require('../models/Enrollment');
// const { Op } = require('sequelize');

// class ProgressService {
//   async updateProgress(userId, courseEnrollmentId, lessonId) {
//     const transaction = await Progress.sequelize.transaction();

//     try {
//       // Find or create progress record
//       const [progress, created] = await Progress.findOrCreate({
//         where: { 
//           userId, 
//           courseEnrollmentId 
//         },
//         defaults: {
//           userId,
//           courseEnrollmentId,
//           status: 'NOT_STARTED'
//         },
//         transaction
//       });

//       // Update last accessed lesson
//       progress.lastCompletedLessonId = lessonId;
//       progress.lastAccessedAt = new Date();
//       progress.status = 'IN_PROGRESS';

//       // Get course ID from enrollment
//       const enrollment = await Enrollment.findByPk(courseEnrollmentId, { 
//         attributes: ['courseId'],
//         transaction 
//       });

//       // Calculate total lessons in course
//       const totalLessons = await Lesson.count({
//         where: { 
//           courseId: enrollment.courseId 
//         },
//         transaction
//       });

//       // Calculate completed lessons
//       const completedLessons = await Progress.count({
//         where: { 
//           userId, 
//           courseEnrollmentId,
//           status: 'COMPLETED' 
//         },
//         transaction
//       });

//       // Update completion percentage
//       progress.totalLessonsCompleted = completedLessons + 1;
//       progress.completionPercentage = 
//         Math.min((progress.totalLessonsCompleted / totalLessons) * 100, 100);

//       // Update course status
//       progress.status = progress.completionPercentage === 100 
//         ? 'COMPLETED' 
//         : 'IN_PROGRESS';

//       // Save progress
//       await progress.save({ transaction });

//       // Commit transaction
//       await transaction.commit();

//       return progress;
//     } catch (error) {
//       // Rollback transaction if anything fails
//       await transaction.rollback();
//       throw error;
//     }
//   }

//   async markLessonCompleted(userId, courseEnrollmentId, lessonId) {
//     const transaction = await Progress.sequelize.transaction();

//     try {
//       // Find the progress record
//       const progress = await Progress.findOne({
//         where: { 
//           userId, 
//           courseEnrollmentId 
//         },
//         transaction
//       });

//       if (!progress) {
//         throw new Error('Progress record not found');
//       }

//       // Get course ID from enrollment
//       const enrollment = await Enrollment.findByPk(courseEnrollmentId, { 
//         attributes: ['courseId'],
//         transaction 
//       });

//       // Calculate total lessons in course
//       const totalLessons = await Lesson.count({
//         where: { 
//           courseId: enrollment.courseId 
//         },
//         transaction
//       });

//       // Mark lesson as completed
//       progress.lastCompletedLessonId = lessonId;
//       progress.status = 'COMPLETED';

//       // Update completion percentage
//       progress.totalLessonsCompleted += 1;
//       progress.completionPercentage = 
//         Math.min((progress.totalLessonsCompleted / totalLessons) * 100, 100);

//       // Update overall course status
//       progress.status = progress.completionPercentage === 100 
//         ? 'COMPLETED' 
//         : 'IN_PROGRESS';

//       // Save updated progress
//       await progress.save({ transaction });

//       await transaction.commit();

//       return progress;
//     } catch (error) {
//       await transaction.rollback();
//       throw error;
//     }
//   }

//   async getCourseProgress(userId, courseId) {
//     // Find the enrollment first
//     const enrollment = await Enrollment.findOne({
//       where: { 
//         userId, 
//         courseId 
//       }
//     });

//     if (!enrollment) {
//       return null;
//     }

//     // Find progress for the specific enrollment
//     return Progress.findOne({
//       where: { 
//         userId, 
//         courseEnrollmentId: enrollment.id 
//       },
//       include: [
//         { 
//           model: Enrollment,
//           include: [{ model: Lesson }]
//         }
//       ]
//     });
//   }
// }

// module.exports = new ProgressService();
