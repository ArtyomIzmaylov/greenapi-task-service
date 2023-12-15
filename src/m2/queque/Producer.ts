import amqp from "amqplib"
import {CalculationResultInterface} from "../model/CalculationResultInterface";
import {QUEUE_RESULT, RABBIT_URL} from "../initConfig";

export class Producer {
    private channel! : amqp.Channel;
    private connection!: amqp.Connection;
    async closeChannel() {
        await this.channel.close()
        await this.connection.close()
    }
    private async createChannel() {
        this.connection = await amqp.connect(RABBIT_URL)
        this.channel = await this.connection.createChannel()
    }
    async produce(calculationResult : CalculationResultInterface) {
        await this.createChannel()
        await this.channel.assertQueue(QUEUE_RESULT, { durable: false });
        await this.channel.sendToQueue(QUEUE_RESULT, Buffer.from(JSON.stringify(calculationResult)))
        console.log(`The message ${calculationResult} was send successful`)
    }
}

