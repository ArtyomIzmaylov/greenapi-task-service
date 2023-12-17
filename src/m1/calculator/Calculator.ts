import {CalculationResultInterface} from "../model/CalculationResultInterface";
import {Consumer} from "../queque/Consumer";
import {CalculateDataInterface} from "../model/CalculateDataInterface";
import {Producer} from "../queque/Producer";

export interface CalculatorInterface {
    calculate(calculateData: CalculateDataInterface): Promise<CalculationResultInterface>
}

export class Calculator implements CalculatorInterface {

    constructor(private readonly consumer : Consumer, private readonly producer: Producer) {
    }
    async calculate(calculateData: CalculateDataInterface): Promise<CalculationResultInterface> {
        await this.producer.produce(calculateData)
        const calculateResult : CalculationResultInterface = await this.consumer.consume(calculateData)
        await this.consumer.closeChannel()
        await this.producer.closeChannel()

        return calculateResult
    }
}