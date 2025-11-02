import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db';
import cookieParser from "cookie-parser";
import passport from "passport";
import { passportInit } from './controllers/authentication/auth';
import { routes } from './routes';
// import { exitRoom, goToChallengeRoom } from '../controllers/challengeController';

dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: [
      "https://codespaceforyou.vercel.app",
      "http://localhost:4321",
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  path: '/socket.io/', // Define the socket.io path explicitly
});

app.use(
    cors({
      credentials: true,
      origin: [
        process.env.REACT_APP_BASE_URL,
      ],
    }),
  );

// Middleware
app.use(express.json());

// Database connection
connectDB();

app.use(cookieParser());

app.use(passport.initialize());
passportInit(passport);

routes(app);

// io.on('connection', (socket) => {
//   socket.on('userConnected',(userId) =>{
//     console.log('User:', userId, 'is connected:', socket.id);
//   });
//   socket.on('toChallengeRoom', ({ userId, socketId, roomId }) => {
//     goToChallengeRoom( userId, socketId, roomId);
//   });
//   socket.on('exitRoom', ({ userId, socketId, roomId }) => {
//     exitRoom( userId, socketId, roomId);
//   });
// }); 

// Start server
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 