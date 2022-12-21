import { IServerRes } from "../interfaces"

// HTTP STATUS CONSTANTS
export const OK = 200
export const CREATED = 201
export const NO_CONTENT = 204
export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const NOT_FOUND = 404
export const INTERNAL_SERVER_ERROR = 500

export const errorInService:IServerRes = {
    data : null,
    message: "An error occured",
    success: false,
    statusType: INTERNAL_SERVER_ERROR
}

export const noFoundDocument:IServerRes = {
    data: null,
    message: "Not found document in server",
    statusType: NOT_FOUND,
    success: false
}

export const badRequestInService:IServerRes = {
    data: null,
    message: "Bad Request made",
    statusType:BAD_REQUEST,
    success: false
}