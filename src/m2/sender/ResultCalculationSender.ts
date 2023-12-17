import amqp from "amqplib";
import {RABBIT_URL} from "../../m1/initConfig";
import {CalculateDataInterface} from "../../m1/model/CalculateDataInterface";
import {QUEUE_RESULT} from "../initConfig";
import {CalculationResultInterface} from "../model/CalculationResultInterface";

export interface ResultCalculationSenderInterface {
    send(resultData : CalculationResultInterface) : Promise<void>
}
export class ResultCalculationSender implements ResultCalculationSenderInterface{
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
    async send(resultData : CalculationResultInterface) {
        await this.createChannel()
        await this.channel.assertQueue(QUEUE_RESULT, { durable: false });
        await this.channel.sendToQueue(QUEUE_RESULT, Buffer.from(JSON.stringify(resultData)))
    }
}

