import {Schema, model} from "mongoose";
import {IFinancialData} from '../interfaces/index'

const ExpenseSchema = new Schema<IFinancialData>({
    concept : {
        type: String, 
        required: true
    },
    amount: {
        type: Number, 
        required: true
    },
    expenseType:{
        type: Number,
        required: true
    },
    loanId:{
        type: String,
        required: false
    },
    fulldate: {
        type: Date, 
        required: true, 
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

export default model<IFinancialData>("Expense", ExpenseSchema)