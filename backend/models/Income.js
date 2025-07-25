import mongoose from 'mongoose';
const incomeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
    icon:{type: String, required: false},
    amount: {type: Number,required: true},
    source: {type: String,required: true},
    date: {type: Date,default: Date.now},
},
{timestamps: true}
);
const Income = mongoose.model('Income', incomeSchema);
export default Income;