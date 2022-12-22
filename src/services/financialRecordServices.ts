import mongoose from "mongoose";
import Expense from "../models/expenses";
import Income from "../models/income";
import { IFinancialData, ILoan, IServerRes } from "../interfaces";
import connectToDb from "../database/connection";
import { addLoan, updateLoan } from "./loansServices"
import { ExpenseTypes, IncomesTypes } from "../models/transaction_types";

import {OK, 
       NO_CONTENT, 
       CREATED,
       NOT_FOUND,
       BAD_REQUEST,
       errorInService,
       noFoundDocument,
       badRequestInService,

    } from '../constants/constants'

const addFinancialData = async (record:IFinancialData, type:"expense"|"income")=> {

    const recordToAdd : IFinancialData = {...record} 
    let res:IServerRes;

    if(record.incomeType === 2 || record.expenseType === 2){

        let loanApplied : ILoan = {
            personName: record.personName as string,
            day: record.day,
            month: record.month,
            year: record.year,
            fulldate: record.fulldate,
            amount: record.amount,
            balance: record.amount,
            isLender: type === "expense"
        }

        const loanId = await addLoan(loanApplied)

        if(!loanId){
            res = errorInService;
            return res
        }
        recordToAdd.loanId = loanId._id.toString()
    }

    if(record.incomeType === 3 || record.expenseType === 3 ){

       const updated = await updateLoan(recordToAdd.loanId as string, record.amount)
        
       if(updated !== OK){

        switch(updated){
            
            case BAD_REQUEST:
                res = badRequestInService
                break;
            
            case NOT_FOUND:
                res = noFoundDocument
                break;

            default:
                res = errorInService
                break;
        }
        return res
       }
    }

    // Adding expenses or incomes to db
    let financialDataModel = type === "expense" ? new Expense(recordToAdd) : new Income(recordToAdd)
    
    try{
        await connectToDb()
        await financialDataModel.save()

        res = {
            success: true,
            message: "Data saved successfully",
            data: null,
            statusType: CREATED
        }
    }
    catch(e){
        console.log(e)
        res = errorInService
    }
    return res
}

const getFinancialDataByDate = async(date:string, type:"expense"|"income") => {

    let res: IServerRes;
    
    try{
        await connectToDb();

        let result = type === "expense" 
                ? await Expense.find({fulldate:date}) 
                : await Income.find({fulldate:date});

        res = {
            data: result,
            message:null,
            statusType : OK,
            success: true
        }
    }
    catch(e){
        console.log(e)
        res = errorInService
    }
    return res
}

const getFinancialDataByMonthAndYear = async(month: number, year: number, type:"expense"|"income")  => {

    let res: IServerRes;

    try{
        await connectToDb();
        
        let result:any = type === "expense" 
                ? await Expense.find({month, year}) 
                : await Income.find({month, year});        

        for (let trans of result) {

           let transaction = type === "expense" 
                            ? await ExpenseTypes.findById(trans.expenseType).exec()
                            : await IncomesTypes.findById(trans.incomeType).exec()
            
            trans._doc.transactionType = transaction?.description
        }

        res = {
            data: result,
            success: true,
            message: null,
            statusType: OK
        }
    }
    catch(e){
        console.log(e)
        res = errorInService
    }
    return res
}

const updateFinancialData = async(id:string, record:IFinancialData, type:"expense"|"income")=>{
    // Update data

    let res: IServerRes;

    try{
        await connectToDb();

        let doc = type === "expense" 
                ? await Expense.findById(new mongoose.mongo.ObjectId(id))
                : await Income.findById(new mongoose.mongo.ObjectId(id))

        if(doc){
            doc.amount = record.amount
            doc.concept = record.concept
            doc.day = record.day
            doc.month = record.month
            doc.year = record.year
            doc.fulldate = record.fulldate
            await doc.save()

            res = {
                data: null,
                message: "Data updated",
                statusType: OK,
                success: true
            }
            return res
        }
        res = noFoundDocument
    }
    catch(e){
        console.log(e)
        res = errorInService;
    }
    return res
}

const deleteFinancialData = async (id: string, type: "expense"|"income") => {
    // Delete data 

    let res: IServerRes;

    try{
        await connectToDb()

        let result = type === "expense" 
            ? await Expense.findByIdAndDelete(new mongoose.mongo.ObjectId(id))
            : await Income.findByIdAndDelete( new mongoose.mongo.ObjectId(id))
        
        if(result){
            res = {
                data: null,
                message: "Data deleted",
                statusType: NO_CONTENT,
                success: true
            } 
            return res
        }
        res = noFoundDocument
    }
    catch(e){
        console.log(e)
        res = errorInService
    }
    return res
}

export default {
    addFinancialData,
    getFinancialDataByMonthAndYear,
    getFinancialDataByDate,
    updateFinancialData,
    deleteFinancialData
}