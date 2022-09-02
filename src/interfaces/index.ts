
export interface financialData  {
    amount : number,
    concept: string,
    date : string
}

export interface serverRes {

    message: string | null,
    data: string | null,
    success : boolean,
    statusType : 200 | 400 | 401 | 404 | 500 
}