import express from "express";
import { FinancialRecordC } from "../controllers";

const route = express.Router()

// EXPENSES ROUTES
route.post('/FinancialData/add/:type', FinancialRecordC.addFinancialRecordController)
route.post('/FinancialData/get/byDate/:type', FinancialRecordC.getFinancialDataByDateController)
route.post('/FinancialData/get/byMonth/:type', FinancialRecordC.getDataByYearAndMonthController)

export default route