import {PayloadInterface} from "./Interface";

export interface ProducerInterface {
    produce(data : PayloadInterface) : Promise<void>
}