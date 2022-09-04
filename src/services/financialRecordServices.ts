import mongoose from "mongoose";
import Expense from "../models/expenses";
import Income from "../models/income";
import { IFinancialData, IServerRes } from "../interfaces";
import connectToDb from "../database/connection";

import {OK, 
       INTERNAL_SERVER_ERROR, 
       NOT_FOUND, 
       NO_CONTENT, 
       CREATED
    } from '../constants/constants'

const serverErrorInService:IServerRes = {
    data : null,
    message: "An error occured",
    success: false,
    statusType: INTERNAL_SERVER_ERROR
}

const noFoundDocument:IServerRes = {
    data: null,
    message: "Not found document in server",
    statusType: NOT_FOUND,
    success: false
}

const addFinancialData = async (record:IFinancialData, type:"expense"|"income")=> {

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
            statusType: CREATED
        }
    }
    catch(e){
        console.log(e)
        res = serverErrorInService
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
        res = serverErrorInService
    }
    return res
}

const getFinancialDataByMonthAndYear = async(month: number, year: number, type:"expense"|"income")  => {

    let res: IServerRes;

    try{
        await connectToDb();
        
        let result = type === "expense" 
                ? await Expense.find({month, year}) 
                : await Income.find({month, year});

        res = {
            data: result,
            success: true,
            message: null,
            statusType: OK
        }
    }
    catch(e){
        console.log(e)
        res = serverErrorInService
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
        }
        else{
            res = noFoundDocument
        }
    }
    catch(e){
        console.log(e)
        res = serverErrorInService;
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
        }else{
            res = noFoundDocument
        }
    }
    catch(e){
        console.log(e)
        res = serverErrorInService
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