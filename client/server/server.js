import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

// Immediately-invoked async function
const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  try {
    await connectDB();
    console.log('✅ Database connected');

    // Middleware
    app.use(express.json());
    app.use(cors());
    app.use(clerkMiddleware());

    // Routes
    app.get('/', (req, res) => res.send('Server is Live!'));
    app.use('/api/inngest', serve({ client: inngest, functions }));

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Server listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Server failed to start:', err);
  }
};

startServer(); // <-- invoke async wrapper
