import cors from 'cors';
import { CorsOptions } from 'cors';

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    // Dynamic origin validation
    const allowedOrigins = [
      'http://localhost:3000',
      'https://edubridges.vercel.app/'
    ];

    // if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    //   callback(null, true);
    // } else {
    //   callback(new Error('Not allowed by CORS'));
    // }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers'
  ],
  credentials: true
};

export const configureCors = () => cors(corsOptions);
