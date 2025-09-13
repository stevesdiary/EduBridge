// import { Request as ExpressRequest, Response } from 'express';
// import { progressService } from '../services/progress.tracking.service';

// class ProgressController {
//   async updateLessonProgress(req: ExpressRequest, res: Response) {
//     try {
//       if(!req.user) {
//         return res.json('A user must be logged in')
//       }
//       const { courseEnrollmentId, lessonId } = req.query;
//       const userId = req.user.id || req.query.userId;

//       const progress = await progressService.updateProgress(
//         userId, 
//         courseEnrollmentId, 
//         lessonId
//       );

//       res.status(200).json({
//         status: progress.status,
//         message: progress.message,
//         data: progress.data
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: 'Failed to update progress',
//         error: error.message
//       });
//     }
//   }

//   async completeLessonProgress(req, res) {
//     try {
//       const { courseEnrollmentId, lessonId } = req.body;
//       const userId = req.user.id;

//       const progress = await progressService.markLessonCompleted(
//         userId, 
//         courseEnrollmentId, 
//         lessonId
//       );

//       res.status(200).json({
//         success: true,
//         progress,
//         message: 'Lesson completed successfully'
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: 'Failed to complete lesson',
//         error: error
//       });
//     }
//   }

//   async getCourseProgress(req: ExpressRequest, res: Response) {
//     try {
//       const { courseId } = req.params;
//       const userId = req.user.id;

//       const progress = await progressService.getCourseProgress(
//         userId, 
//         courseId
//       );

//       res.status(200).json({
//         success: true,
//         progress
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: 'Failed to retrieve course progress',
//         error: error
//       });
//     }
//   }
// }

// module.exports = new ProgressController();
