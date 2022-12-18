import mongoose from "mongoose";
import { IFinancialData } from "../interfaces";

const Schema = mongoose.Schema

const IncomeSchema = new Schema<IFinancialData>({
    concept : {
            type: String, 
            required: true
    },
    amount: {
            type: Number, 
            required: true
    },
    incomeType:{
        type: Number,
        required: true
    },
    loanId:{
        type:Number,
        required:false
    },
        fulldate: {
                type: String, 
                required: true, 
                default: new Date().toLocaleDateString()
        },
    day: {
        type: Number, 
        required: true
    },
    month : {
         type: Number,
         required: true
    },
    year: {
        type: Number, 
        required: true
    }
})

export default mongoose.model<IFinancialData>("Income", IncomeSchema)