import mongoose from "mongoose";
import { IServerRes, ILoan } from "../interfaces";
import connectToDb from "../database/connection";
import Loan from "../models/loans";

import {OK, BAD_REQUEST, INTERNAL_SERVER_ERROR,
    errorInService,
    badRequestInService,
    NOT_FOUND
 } from '../constants/constants'

export const addLoan = async(record: ILoan) => {

    const loanModel = new Loan(record)
    let res

    try{
        await connectToDb()
        res = await loanModel.save()
    }
    catch(e){
        console.log(e)
        res = null;
    }
    return res
}

export const getActiveLoans = async (): Promise<IServerRes> => {

    let result;

    try{
        await connectToDb()
        const activeLoans = await Loan.find({balance:{$gte : 1}} )

        result = {
            data: activeLoans,
            message: null,
            statusType: OK,
            success: true
        }
    }
    catch(e){
        console.log(e)
        result = errorInService
    }

    return result
}

export const updateLoan = async (id:string, amount:number) => {

    let res : number | null;

    try{
        await connectToDb()

        let loanToUpdate = await Loan.findById(new mongoose.mongo.ObjectId(id))
        
        if(!loanToUpdate){
            res = NOT_FOUND
            return res
        }

        if(amount > loanToUpdate?.balance!){
            res = BAD_REQUEST
            return res
        }

        loanToUpdate.balance  -= amount
        await loanToUpdate.save()   
        res = OK
        return res
    }
    catch(e){
        console.log(e)
        res = INTERNAL_SERVER_ERROR;
    }
    return res
}