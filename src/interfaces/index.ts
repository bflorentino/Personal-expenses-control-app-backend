
export interface IFinancialData  {
    amount : number,
    concept: string,
    fulldate? : string,
    day: number,
    month: number,
    year: number
}

export interface IServerRes {

    message: string | null,
    data: any,
    success : boolean,
    statusType : 200 | 400 | 401 | 404 | 500 
}