import { FinancialRecord } from "../services/index";
import { Request, Response} from "express";
import {IServerRes} from '../interfaces/index'

const addFinancialRecordController = async (req:Request, res:Response) => {

    const result : IServerRes = await FinancialRecord.addFinancialData(req.body, req.params.type as "expense" | "income")
    res.statusCode = result.statusType
    res.send(result)
}

const getFinancialDataByDateController = async (req:Request, res:Response) => {

    const result : IServerRes = await FinancialRecord.getFinancialDataByDate(req.body.fulldate, req.params.type as "expense" | "income")
    res.statusCode = result.statusType
    res.send(result)
}

const getDataByYearAndMonthController = async (req: Request, res: Response) => {

        console.log(req.body);
    
        const result : IServerRes = await FinancialRecord.getFinancialDataByMonthAndYear(req.body.month, 
                                        req.body.year, req.params.type as "expense" | "income")

        res.statusCode = result.statusType
        res.send(result)
}

const updateData = async (req: Request, res: Response) => {
    
    const result : IServerRes = await FinancialRecord.updateFinancialData(req.params.id, req.body, 
                                req.params.type as "expense" | "income")

    res.statusCode = result.statusType
    res.send(result)
}

const deleteData = async (req: Request, res: Response) => {
    
    const result : IServerRes = await FinancialRecord.deleteFinancialData(req.params.id, 
                                req.params.type as "expense" | "income")

    res.statusCode = result.statusType
    res.send(result)
}

export default {
    addFinancialRecordController,
    getFinancialDataByDateController,
    getDataByYearAndMonthController,
    updateData,
    deleteData
}