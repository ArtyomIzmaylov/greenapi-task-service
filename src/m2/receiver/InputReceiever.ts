import {Consumer} from "../queue/Consumer";
import {CalculateDataInterface} from "../model/CalculateDataInterface";

export interface InputReceiverInterface {
    receive() : Promise<CalculateDataInterface>
}
export class InputReceiver implements InputReceiverInterface{
    constructor(private readonly consumer : Consumer) {
    }
    async receive() {
        const calculateData = await this.consumer.consume()
        await this.consumer.closeChannel()
        return calculateData
    }
}

