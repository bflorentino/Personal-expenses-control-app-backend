import Expense from "../models/expenses";
import Income from "../models/income";
import { IFinancialData, IServerRes } from "../interfaces";
import connectToDb from "../database/connection";

const serverErrorInService:IServerRes = {
    data : null,
    message: "An error occured",
    success: false,
    statusType: 500
}

const addFinancialData = async (record:IFinancialData, type:"expense"|"income"):Promise<IServerRes> => {

    // Adding expenses or incomes to db

    let financialDataModel = type === "expense" ? new Expense(record) : new Income(record) 
    let res:IServerRes;
    
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
        res = serverErrorInService
    }
    
    return res
}

const getFinancialDataByDate = async(date:string, type:"expense"|"income"):Promise<IServerRes> => {

    let res: IServerRes;
    
    try{
        await connectToDb();
        let result;

        if(type === "expense"){
            result = await Expense.findOne({date})
        }else{
            result = await Income.findOne({date})
        }

        res = {
            data: result,
            message:null,
            statusType : 200,
            success: true
        }
        
    }catch(e){
        console.log(e)
        res = serverErrorInService
    }
    return res
}

const getFinancialDataByMonthAndYear = async(month: number, year: number, type:"expense"|"income"):Promise<IServerRes>  => {

    let res: IServerRes;

    try{
        await connectToDb();
        let result;
        if(type==="expense"){
            result = await Expense.find({month, year})
        }else{
            result = await Income.find({month, year})
        }

        res = {
            data: result,
            success: true,
            message: null,
            statusType: 200
        }

    }catch(e){
        console.log(e)
        res = serverErrorInService
    }

    return res
}

export default {
    addFinancialData,
    getFinancialDataByMonthAndYear,
    getFinancialDataByDate
}