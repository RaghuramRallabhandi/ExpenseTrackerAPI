import Expense from "../models/Expense.js";
import xlsx from "xlsx";
export const addExpense = async(req, res)=>{
    try{
        const {user, amount, description, category, date} = req.body;
        if(!amount || !description || !category || !date){
            res.status(400).json(`Please provide all details`);
        }
        const newExpense = await Expense.create({
            user, amount, description, category, date : new Date(date)
        });
        newExpense.save();
        res.status(200).json(`New Expense Created! : ${newExpense}`);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const getExpense = async(req, res)=>{
    const userId = req.user.id;
    console.log(userId);
    try{
        const userExpenses = await Expense.find({user : userId }).sort({date:-1});
        res.status(200).json(userExpenses);
    }
    catch(error){
        res.status(400).json(error.message);
    }
}

export const deleteExpense = async(req, res)=>{
    const {userId} = req.params;
    try{
        const deletedExpense = await Expense.findByIdAndDelete(userId);
        if(!deletedExpense){
            return res.status(404).json(`Couldn't delete expense with ${userId} || Expense not found`);
        }
        res.status(200).json(`Expense deleted Successfully!`);

    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const updateExpense = async(req, res)=>{
    const userId = req.params.id;
    try{
        const {amount, description, category,} = req.body;
        await Expense.findByIdAndUpdate(userId, {amount, description, category}, {new : true});
        res.status(200).json(`Expense Updated Successfully`);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const downloadAllExpenses = async(req, res)=>{
    const userId = req.user.id;
    try{
        const expense = await Expense.find({user:userId}).sort({date:-1});
        const data = expense.map((item) => ({
            amount: item.amount, 
            description : item.description,
            category : item.category,
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }
    catch(error){
        res.status(500).json(error.message);
    }
}