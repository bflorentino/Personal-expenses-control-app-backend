import express from "express";
import { FinancialRecordC, getActiveLoansC } from "../controllers";

const route = express.Router()

// EXPENSES ROUTES
route.post('/FinancialData/add/:type', FinancialRecordC.addFinancialRecordController)
route.post('/FinancialData/get/byDate/:type', FinancialRecordC.getFinancialDataByDateController)
route.post('/FinancialData/get/byMonth/:type', FinancialRecordC.getDataByYearAndMonthController)
route.put('/FinancialData/update/:id/:type', FinancialRecordC.updateData)
route.delete('/FinancialData/delete/:id/:type', FinancialRecordC.deleteData)

// LOANS ROUTES
route.get('/loans', getActiveLoansC.getActiveLoansController)

export default route