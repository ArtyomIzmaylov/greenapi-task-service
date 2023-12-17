import {CalculateDataInterface} from "../model/CalculateDataInterface";
import Joi from "joi";
import {Request, Response} from "express";
export interface ValidatorInterface {
    validate(): void
}

export class RequestValidator implements ValidatorInterface {
    constructor(private req : Request, private res : Response) {
    }
     validate(): void {
         const requestSchema = Joi.object({
             requestId: Joi.string().required(),
             calcNumber: Joi.number().required()
         });

         const requestValidation = requestSchema.validate({
             requestId: this.req.headers['x-request-id'],
             calcNumber: this.req.body.calcNumber
         });

         if (requestValidation.error) {
             this.res.status(400).json({ error: requestValidation.error.details[0].message });
         }
    }
}