import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './Model/User.js';
import authRoutes from './Routes/auth.routes.js';
import userRoutes from './Routes/user.routes.js';
import postRoutes from './Routes/post.routes.js';
import categoryRoutes from './Routes/category.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

mongoose.set({
  strictQuery: false,
});
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('db connect');
  } catch (err) {
    throw err;
  }
};

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/categories', categoryRoutes);

app.listen(8800, () => {
  connect();
  console.log('backend has Running!');
});
