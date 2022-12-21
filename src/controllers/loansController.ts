import { getActiveLoans } from "../services/index";
import { Request, Response} from "express";
import {IServerRes} from '../interfaces/index'

const getActiveLoansController = async (req:Request, res:Response) => {
    const result : IServerRes =  await getActiveLoans()
    res.statusCode = result.statusType
    res.send(result)
}

export default {
    getActiveLoansController
}