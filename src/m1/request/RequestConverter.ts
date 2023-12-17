import {CalculateDataInterface} from "../model/CalculateDataInterface";
import {Request} from "express";

export interface RequestConverterInterface {
    convert(req : Request) : CalculateDataInterface
}

export class RequestConverter implements RequestConverterInterface {
    convert(req: Request): CalculateDataInterface {
        return  {
            requestId: req.headers['x-request-id'] as string,
            calcNumber: parseInt(req.body.calcNumber)
        }
    }
}