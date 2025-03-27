import express, { Router } from "express";

import userRouter from "./routes/user.route";
import loginRouter from "./routes/login.route";
import courseRouter from "./routes/course.route";
import moduleRouter from "./routes/module.route";
import enrollmentRouter from "./routes/enrollment.route";
import lessonRouter from "./routes/lesson.route";
import forgotPasswordRouter from "./routes/forgot.password";
// import badgeRouter from "./routes/badge.route";
// import progressRouter from './routes/progress.route';
// import externalRouter from './routes/exteral.route';
import verifyRouter from "./routes/verify.email";
// import profileRouter from "./routes/profile.route";
// import certificateRouter from "./routes/certificate.route";
// import user_badgeRouter from "./routes/user-badge.route";
import cors from 'cors';
const router = Router();
const CORS_CONFIG = {
  development: ['http://localhost:3000'],
  production: ['https://edubridges.vercel.app']
};

const corsOptions = {
  origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
    const allowedOrigins = [
      ...CORS_CONFIG.development,
      ...CORS_CONFIG.production
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Access-Control-Allow-Origin'
  ],
  credentials: true
};

router.use(cors(corsOptions));
// router.use((req, res, next) => {
//   console.log('Request Headers:', req.headers);
//   console.log('Request Body:', req.body);
//   console.log('Request Query:', req.query);
//   next();
// });

router.use("/user", userRouter);
router.use("/log", loginRouter);
router.use('/verify', verifyRouter);
router.use("/course", courseRouter);
router.use('/lesson', lessonRouter);
router.use('/module', moduleRouter);
router.use('/enrollment', enrollmentRouter);
router.use('/password', forgotPasswordRouter);
// router.use('/progress', progressRouter);
// router.use('/external', externalRouter);
// router.use('/badge', badgeRouter);
// router.use('/profile', profileRouter);
// router.use('/certificate', certificateRouter);
// router.use('/user-badge', user_badgeRouter)

export default router;