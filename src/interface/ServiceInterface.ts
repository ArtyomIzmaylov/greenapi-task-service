import {PayloadInterface} from "./Interface";

export interface MessageServiceInterface {
    send(data : PayloadInterface) : Promise<void>
}