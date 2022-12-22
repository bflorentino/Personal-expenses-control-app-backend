import { Schema, model} from 'mongoose'
import { ITransactionType } from '../interfaces'

const ExpenseTypesSchema = new Schema<ITransactionType>({
    _id:{
        type: Number,
    },
    description:{
        type:String
    }
})

const IncomesTypesSchema = new Schema<ITransactionType>({
    _id:{
        type: Number,
    },
    description:{
        type:String
    }
})

export const ExpenseTypes   =  model<ITransactionType>("expenses_types", ExpenseTypesSchema )
export const IncomesTypes =  model<ITransactionType>("incomes_types", IncomesTypesSchema )