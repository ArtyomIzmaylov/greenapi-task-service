import {ProducerInterface} from "../interface/ProducerInterface";
import {PayloadInterface} from "../interface/Interface";
import amqp from "amqplib"
export class RabbitProducer implements ProducerInterface{
    constructor() {
    }
    async produce(payload : PayloadInterface) {
        try {
            const connection = await amqp.connect('amqp://localhost');
            const channel = await connection.createChannel();

            // Создаем очередь (если её еще нет)
            const channelName = 'user.analytics';

            await channel.assertQueue(channelName, { durable: false });

            channel.sendToQueue(channelName, Buffer.from(JSON.stringify(payload)));
            console.log(` [x] Sent '${payload}'`);

            // Закрываем соединение
            setTimeout(() => {
                connection.close();
            }, 500);
        }
        catch (error) {
            console.log(error)
        }
    }
}

