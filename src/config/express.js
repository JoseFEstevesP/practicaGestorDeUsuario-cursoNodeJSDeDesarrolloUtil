import userRouter from '#Routes/user.routes.js';
import express from 'express';
const app = express();
// middleware
app.use(express.json());
// routers
app.use('/user', userRouter);
export default app;
