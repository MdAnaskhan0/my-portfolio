import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// import routes
import userRoute from './routes/userRoute.js';
import socialMediaRoute from './routes/socialMediaRoute.js';
import educationRoute from './routes/educationRoute.js';
import experienceRoute from './routes/experienceRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

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

app.use('/api/user', userRoute);
app.use('/api/socialmedia', socialMediaRoute);
app.use('/api/education', educationRoute);
app.use('/api/experience', experienceRoute);
