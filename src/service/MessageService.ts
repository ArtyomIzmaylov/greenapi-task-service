import {MessageServiceInterface} from "../interface/ServiceInterface";
import {ProducerInterface} from "../interface/ProducerInterface";
import {PayloadInterface} from "../interface/Interface";

export class MessageService implements MessageServiceInterface{
    private rabbitProducer: ProducerInterface;
    constructor(rabbitProducer : ProducerInterface) {
        this.rabbitProducer = rabbitProducer
    }
    async send(data : PayloadInterface){
        await this.rabbitProducer.produce(data)
    }
}


