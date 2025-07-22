import Expense from "../models/Expense.js";
export const addIncome = async(req, res)=>{
    const userId = req.user.id;
    try{
        const {amount, description, category, date} = req.body;
        if(!amount || !description || !category || !date){
            res.status(400).json(`Please provide all details`);
        }
        const newExpense = await Expense.create({
            amount, description, category, date : new Date(date)
        });
        res.status(200).json(`New Expense Created! : ${newExpense}`);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const getExpense = async(req, res)=>{
    const userId = req.user.id;
    try{
        const userExpense = await Expense.findById(userId);
        res.status(200).json(`Expense fetched : ${userExpense}`);
    }
    catch(error){
        res.status(400).json(error.message);
    }
}

export const deleteExpense = async(req, res)=>{
    const userId = req.params.id;
    try{
        await Expense.findByIdAndDelete(userId);
        res.status(200).json(`Expense deleted Successfully!`);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const updateExpense = async(req, res)=>{
    const userId = req.params.id;
    try{
        const {amount, description, category, date} = req.body;
        await Expense.findByIdAndUpdate(userId, {amount, description, category, date:new Date(date)}, {new : true});
        res.status(200).json(`Expense Updated Successfully`);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

