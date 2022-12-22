import {Schema, model} from "mongoose";
import { ILoan } from "../interfaces";

const LoanSchema = new Schema<ILoan>({
    personName : {
        type: String,
        required: true
    },
    day:{
        type: Number,
        required: true,
    },
    month:{
        type: Number,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    fulldate: {
        type: Date, 
        required: true, 
    },
    balance:{
        type: Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    isLender:{
        type:Boolean,
        required: true
    }
})

export default model<ILoan>("Loan", LoanSchema)