import express from 'express';
import userRoutes from './routes/user.routes'
import router from './routes/user.routes';

const app = express();

app.use('/api/user', userRoutes);

export default app;