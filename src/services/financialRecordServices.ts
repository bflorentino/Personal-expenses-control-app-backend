import Expense from "../models/expenses";
import Income from "../models/income";
import { financialData, serverRes } from "../interfaces";
import connectToDb from "../database/connection";

const addFinancialData = async (record:financialData, type:"expense"|"income"):Promise<serverRes> => {

    // Adding expenses or incomes to db

    let financialDataModel = type === "expense" ? new Expense(record) : new Income(record) 
    let res:serverRes;
    
    try{
        await connectToDb()
        await financialDataModel.save()

        res = {
            success: true,
            message: "Data saved successfully",
            data: null,
            statusType: 200
        }
    }
    catch(e){

        console.log(e)

        res = {
            success: false,
            message: "An error ocurred",
            data: null,
            statusType: 500
        }
    }

    return res
}

export default {
    addFinancialData
}