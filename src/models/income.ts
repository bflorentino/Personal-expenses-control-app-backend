import mongoose from "mongoose";

const Schema = mongoose.Schema

const IncomeSchema = new Schema({
    concept : {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true}
})

export default mongoose.model("Income", IncomeSchema)