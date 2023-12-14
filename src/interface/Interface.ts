import {UUID} from "crypto";

export interface PayloadInterface {
    requestId : string | string[] | undefined,
    id : number,
    name : string,
    lastname : string,
    description : string
}