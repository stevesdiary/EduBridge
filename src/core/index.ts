import express from 'express';
import rateLimit from 'express-rate-limit';

import sequelize from './database';
import router from '../router';
const server = express();
import cors from 'cors';
import { CorsOptions } from 'cors';
const corsOptions: CorsOptions = {
  credentials: true,
  origin:
    ['http://localhost:3000/', 'https://edubridges.vercel.app/'],
    allowedHeaders: [ 'Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers' ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']}

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const port = process.env.LOCAL_PORT || 3001;

// const limiter = rateLimit ({
//   windowMs: 10 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: 'Too many request from this IP, try again after 10 minutes'

// })

server.get("/", (req, res) => {
  res.json({ message: "Welcome to EduBridge!." });
});

// server.use(limiter);
server.use('/api/v1', router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default startServer;
