import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import incomeRoutes from './routes/IncomeRoute.js';
import expenseRoutes from './routes/ExpenseRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to database
try {
    await connectDB();
} catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process on fatal error
}

//middleware to handle cors
const clientURL = process.env.CLIENT_URL || 'http://localhost:3000'; // Replace with your client URL
app.use(cors({
    origin: clientURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} successfully!`);
});

