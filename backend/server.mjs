
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import websiteContentRoutes from './routes/websiteContentRoutes.js';
import userSettingsRoutes from './routes/userSettingsRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import geminiChatRouter from './routes/geminiChat.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/content', websiteContentRoutes);
app.use('/api/settings', userSettingsRoutes);
app.use('/api/gemini-chat', geminiChatRouter);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
