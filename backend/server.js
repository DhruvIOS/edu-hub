import dotenv from "dotenv"


dotenv.config();


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import analysisRoutes from "./routes/analysis.js"






const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to mongoDB'))
    .catch(err => console.error(err));


    app.get('/api/test', (req, res) => {
      res.send('Backend is working!');
  });


app.use("/api/auth", authRoutes);
app.use('/api/analysis', analysisRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));