import express from "express";
import { FinancialRecordC } from "../controllers";

const route = express.Router()

// EXPENSES ROUTES
route.post('/FinancialData/add/:type', FinancialRecordC.addFinancialRecordController)

export default route