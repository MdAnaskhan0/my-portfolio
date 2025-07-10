import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

// Import routes
import userRoute from './routes/userRoute.js';
import socialMediaRoute from './routes/socialMediaRoute.js';
import educationRoute from './routes/educationRoute.js';
import experienceRoute from './routes/experienceRoute.js';
import skillRoute from './routes/skillRoute.js';
import publicationRoute from './routes/publicationRoute.js';
import adminRoute from './routes/adminRoute.js';
import projectCategoryRoute from './routes/projectCategoryRoute.js';
import projectRoute from './routes/projectRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// API Routes
app.use('/profilePicture', express.static(path.join(process.cwd(), 'profilePicture')));
app.use('/projectImage', express.static(path.join(process.cwd(), 'projectImage')));
app.use('/api/user', userRoute);
app.use('/api/socialmedia', socialMediaRoute);
app.use('/api/education', educationRoute);
app.use('/api/experience', experienceRoute);
app.use('/api/skill', skillRoute);
app.use('/api/publication', publicationRoute);
app.use('/api/admin', adminRoute);
app.use('/api/projectcategory', projectCategoryRoute);
app.use('/api/project', projectRoute);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.mongodb_URL);
    console.log(`MongoDB connected`);
    app.listen(PORT, () => {
      console.log(`Server running at Port: ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err.message);
    process.exit(1);
  }
};

startServer();
