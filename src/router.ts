import express, { Router } from "express";

import userRouter from "./routes/user.route";
import loginRouter from "./routes/login.route";
import courseRouter from "./routes/course.route";
import moduleRouter from "./routes/module.route";
import enrollmentRouter from "./routes/enrollment.route";
import lessonRouter from "./routes/lesson.route";
// import badgeRouter from "./routes/badge.route";
import verifyRouter from "./routes/verify.email";
// import profileRouter from "./routes/profile.route";
// import certificateRouter from "./routes/certificate.route";
// import user_badgeRouter from "./routes/user-badge.route";
import cors from 'cors';
const router = Router();
const corsOptions = {
  origin: [
    'http://localhost:3000/',
    'https://edubridges.vercel.app/'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers'
  ],
  credentials: true
};

router.use(cors(corsOptions));


router.use("/user", userRouter);
router.use("/log", loginRouter);
router.use('/verify', verifyRouter);
router.use("/course", courseRouter);
router.use('/lesson', lessonRouter);
router.use('/module', moduleRouter);
router.use('/enrollment', enrollmentRouter);
// router.use('/badge', badgeRouter);
// router.use('/profile', profileRouter);
// router.use('/certificate', certificateRouter);
// router.use('/user-badge', user_badgeRouter)

export default router;