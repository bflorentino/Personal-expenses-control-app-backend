
export interface IFinancialData  {
    amount : number,
    concept: string,
    fulldate : Date,
    day: number,
    month: number,
    year: number,
    expenseType?: number,
    incomeType?: number,
    personName?: string,
    transactionType?: string | null,
    loanId?: string | null
}

export interface ILoan {
    personName: string,
    fulldate : Date,
    day: number,
    month: number,
    year: number,
    amount: number,
    balance: number,
    isLender: boolean
}

export interface ITransactionType {
    _id: number,
    description: string
}

export interface IServerRes {

    message: string | null,
    data: any,
    success : boolean,
    statusType : number
}