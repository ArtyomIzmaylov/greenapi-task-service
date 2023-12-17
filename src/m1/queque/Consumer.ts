import amqp from "amqplib";
import {CalculateDataInterface} from "../model/CalculateDataInterface";
import {QUEUE_RESULT, RABBIT_URL} from "../initConfig";
import {CalculationResultInterface} from "../model/CalculationResultInterface";

export interface ConsumerInterface {
    consume(calculateData : CalculateDataInterface) : Promise<CalculationResultInterface>
}

export class Consumer implements  ConsumerInterface{
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
    async consume(calculateData : CalculateDataInterface) : Promise<CalculationResultInterface> {
        await this.createChannel()
        const q = await this.channel.assertQueue(QUEUE_RESULT, {durable : false})

        return new Promise(async (resolve, reject) => {
            await this.channel.consume(q.queue, (msg) => {
                if (msg === null) {
                    reject()
                    return
                }

                const data = JSON.parse(msg.content.toString());

                if (data.requestId === calculateData.requestId) {
                    resolve(data)
                }

                this.channel.ack(msg);
            });
        })
    }
}