import mongoose from "mongoose";
import { IServerRes, ILoan } from "../interfaces";
import connectToDb from "../database/connection";
import Loan from "../models/loans";

import {OK, 
    INTERNAL_SERVER_ERROR, 
    NOT_FOUND, 
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

export const addLoan = async(record: ILoan) => {

    const loanModel = new Loan(record)
    let result

    try{
        await connectToDb()
        result = await loanModel.save()

        console.log(result)
    }
    catch(e){
        console.log(e)
        result = null;
    }
    return result
}