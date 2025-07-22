import Income from "../models/Income.js";
import xlsx from "xlsx";
export const addIncome = async (req, res)=>{
    const userId = req.user.id;
    try{
        const {icon, source, amount, date} = req.body;
        if(!amount || !source || !date){
            res.status(400).json({message:"please provide all the details"});
        }
        const newIncome =  await Income.create({
            userId, icon, source, amount, date:new Date(date)
        });
        res.status(200).json({message:"Income added succesfully"});
    }
    catch (err){
        res.status(500).json({message:err.message});
    }
}


export const getIncome = async(req, res)=>{
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        res.status(200).json(income);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export const deleteIncome = async(req, res)=>{
    const userId = req.params.id;
    try{
        await Income.findByIdAndDelete(userId);
        res.status(200).json({message: `Income with user id :${userId} deleted `});
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
}


export const updateIncome = async(req, res)=> {
    const incomeId = req.params.id;
    try{
        const { icon, source, amount, date } = req.body;
        const updatedIncome = await Income.findByIdAndUpdate(
            incomeId,
            { icon, source, amount, date: new Date(date) },
            { new: true }
        );
        if (!updatedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.status(200).json({ message: "Income updated successfully" });
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}


export const downloadIncomeExcel = async(req, res)=>{
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        const data = income.map((item)=>({
            Source : item.source,
            Amount : item.amount, 
            Date : item.date
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}


