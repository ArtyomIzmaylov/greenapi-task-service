import {Request, Response} from "express";
import {CalculateDataInterface} from "../model/CalculateDataInterface";
import {Producer} from "../queque/Producer";
import {Consumer} from "../queque/Consumer";
import Joi from "joi";
import {CalculatorInterface} from "../calculator/Calculator";

export interface CalculateControllerInterface {
    create(calculateData: CalculateDataInterface, res: Response) : Promise<void>
}
export class CalculateController implements CalculateControllerInterface{
    constructor(private readonly calculator: CalculatorInterface) {
    }
    async create(calculateData: CalculateDataInterface, res: Response)  {
        res.json(await this.calculator.calculate(calculateData));
    }
}
