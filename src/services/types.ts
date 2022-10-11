export type ResponseBad = { msg : string };

export type BasicResponse<T> = {
    response : boolean,
    message?: string,
    payload?: T
};