import amqp from "amqplib"
import {CalculateDataInterface} from "../model/CalculateDataInterface";
import {QUEUE_CALCULATE, RABBIT_URL} from "../initConfig";


export interface ProducerInterface {
    produce(calculateData : CalculateDataInterface) : Promise<void>
}
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
    async produce(calculateData : CalculateDataInterface) {
        await this.createChannel()
        await this.channel.assertQueue(QUEUE_CALCULATE, { durable: false });
        await this.channel.sendToQueue(QUEUE_CALCULATE, Buffer.from(JSON.stringify(calculateData)))
    }
}

