import amqp from "amqplib";
import {QUEUE_CALCULATE, RABBIT_URL} from "../initConfig";
import {CalculationResultInterface} from "../model/CalculationResultInterface";
import {CalculateDataInterface} from "../model/CalculateDataInterface";


export interface ConsumerInterface {
    consume() : Promise<CalculateDataInterface>
}
export class Consumer implements ConsumerInterface{
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
    async consume(): Promise<CalculateDataInterface> {
        await this.createChannel()
        const q = await this.channel.assertQueue(QUEUE_CALCULATE, {durable : false})
        return new Promise(async (resolve, reject) => {
            await this.channel.consume(q.queue, (msg) => {
                if (msg === null) {
                    reject()
                    return
                }
                const calculateData = JSON.parse(msg.content.toString());
                resolve(calculateData)
                this.channel.ack(msg);
            });
        })
    }
}


