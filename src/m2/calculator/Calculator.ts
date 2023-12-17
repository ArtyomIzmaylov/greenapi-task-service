import {CalculationResultInterface} from "../model/CalculationResultInterface";
import {InputReceiver} from "../receiver/InputReceiever";


export interface CalculatorInterface {
    calculate() : Promise<CalculationResultInterface>
}
export class Calculator implements CalculatorInterface{
    constructor(private readonly inputReceiver : InputReceiver) {
    }
    private delay() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('Time is over')
            }, 5000)
        })
    }
    async calculate(): Promise<CalculationResultInterface> {
        const calculateData = await this.inputReceiver.receive()
        await this.delay()
        return {
            calcNumber : calculateData.calcNumber * 2,
            requestId : calculateData.requestId
        }
    }

}