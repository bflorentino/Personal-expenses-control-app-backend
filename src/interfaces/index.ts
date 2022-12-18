
export interface IFinancialData  {
    amount : number,
    concept: string,
    fulldate? : string,
    day: number,
    month: number,
    year: number,
    expenseType?: number,
    incomeType?: number,
    personName?: string,
    loanId?: string | null
}

export interface ILoan {
    personName: string,
    fulldate? : string,
    day: number,
    month: number,
    year: number,
    amount: number,
    balance: number,
    isLender: boolean
}

export interface IServerRes {

    message: string | null,
    data: any,
    success : boolean,
    statusType : number
}