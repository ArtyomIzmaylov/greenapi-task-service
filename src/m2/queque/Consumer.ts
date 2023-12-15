import amqp from "amqplib";
import {Producer} from "./Producer";
import {CalculationResultInterface} from "../model/CalculationResultInterface";
import {QUEUE_CALCULATE, RABBIT_URL} from "../initConfig";


export class Consumer {
    private channel! : amqp.Channel;
    private connection!: amqp.Connection;
    private producer: Producer;

    constructor(producer : Producer) {
        this.producer = producer
    }
    async closeChannel() {
        await this.channel.close()
        await this.connection.close()
    }

    private async createChannel() {
        this.connection = await amqp.connect(RABBIT_URL)
        this.channel = await this.connection.createChannel()
    }
    private delay() {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                resolve()
            }, 5000)
        })

    }
    async consume() {
        await this.createChannel()
        const q = await this.channel.assertQueue(QUEUE_CALCULATE, {durable : false})
        console.log(`M2 Consumer is waiting for messages...`);
        await this.channel.consume(q.queue, async (msg) => {
            if (msg) {
                const data = JSON.parse(msg.content.toString());
                console.log(data)
                await this.delay()
                const calculationResult : CalculationResultInterface = {
                    calcNumber : data.calcNumber * 2,
                    requestId : data.requestId
                }
                console.log(calculationResult)
                await this.producer.produce(calculationResult)
                this.channel.ack(msg);
            }
        });
    }
}