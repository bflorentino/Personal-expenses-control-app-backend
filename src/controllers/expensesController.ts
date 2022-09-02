import { FinancialRecord } from "../services/index";
import { Request, Response} from "express";
import {serverRes} from '../interfaces/index'

const addFinancialRecordController = async (req:Request, res:Response) => {

    const result : serverRes = await FinancialRecord.addFinancialData(req.body, req.params.type as "expense" | "income")
    res.statusCode = result.statusType
    res.send(result)
}

export default {
    addFinancialRecordController
}