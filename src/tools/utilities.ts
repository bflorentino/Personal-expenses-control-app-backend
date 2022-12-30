import { IFinancialData } from "../interfaces";

export const sumTransactions = (transactions:IFinancialData[]) => {

    let initialValue = 0

    const totalAmount = transactions.reduce((acc:number, currentTrans:IFinancialData) =>  {
        return acc + currentTrans.amount
    } , initialValue)

    return totalAmount
} 