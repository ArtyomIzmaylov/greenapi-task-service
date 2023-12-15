import {Request, Response} from "express";
import {CalculateDataInterface} from "../model/CalculateDataInterface";
import {Producer} from "../queque/Producer";
import {Consumer} from "../queque/Consumer";
import Joi from "joi";

export class CalculateController {
    private producer: Producer;
    private consumer: Consumer;
    constructor( producer : Producer, consumer : Consumer) {
        this.producer = producer
        this.consumer = consumer
    }
    async create(req : Request, res : Response)  {
        try {
            const requestSchema = Joi.object({
                requestId: Joi.string().required(),
                calcNumber: Joi.number().required()
            });

            // Проверьте данные запроса на соответствие схеме
            const requestValidation = requestSchema.validate({
                requestId: req.headers['x-request-id'],
                calcNumber: req.body.calcNumber
            });

            if (requestValidation.error) {
                // Если данные не соответствуют схеме, верните ошибку в ответе
                return res.status(400).json({ error: requestValidation.error.details[0].message });
            }
            const requestId: string = req.headers['x-request-id'] as string;
            const calcNumber: number = parseInt(req.body.calcNumber);
            const calculateData: CalculateDataInterface = {
                requestId: requestId,
                calcNumber: calcNumber
            };
            await this.producer.produce(calculateData)
            const calculateResult = await this.consumer.consume(calculateData)
            await this.producer.closeChannel()
            await this.consumer.closeChannel()
            res.json(calculateResult)
        }
        catch (e) {
            res.json(JSON.stringify(e))
        }
    }
}
