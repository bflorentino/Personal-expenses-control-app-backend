import {Schema, model} from "mongoose";

const ExpenseSchema = new Schema({
    concept : {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true}
})

export default model("Expense", ExpenseSchema)