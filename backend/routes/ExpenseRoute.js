import {addExpense, getExpense, deleteExpense, updateExpense, downloadAllExpenses}
 from '../controllers/expenseController.js';
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get("/get", protect, getExpense);
router.post("/add", protect, addExpense);
router.delete("/:id", protect, deleteExpense);
router.put("/:id", protect, updateExpense);
router.get("/download", protect, downloadAllExpenses);
export default router;

