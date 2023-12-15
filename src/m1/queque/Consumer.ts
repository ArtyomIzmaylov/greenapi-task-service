import amqp from "amqplib";
import {CalculateDataInterface} from "../model/CalculateDataInterface";
import {QUEUE_RESULT, RABBIT_URL} from "../initConfig";


export class Consumer {
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
    async consume(calculateData : CalculateDataInterface) {
        await this.createChannel()
        const q = await this.channel.assertQueue(QUEUE_RESULT, {durable : false})
        console.log(`Consumer is waiting for messages. To exit press CTRL+C`);
        const promise = new Promise(async (resolve) => {
            await this.channel.consume(q.queue, (msg) => {
                if (msg) {
                    const data = JSON.parse(msg.content.toString());
                    if (data.requestId === calculateData.requestId) {
                        resolve(data)
                    }
                    this.channel.ack(msg);
                }
            });
        })
        return promise
    }
}