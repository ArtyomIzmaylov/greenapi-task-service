import * as dotenv from 'dotenv';
dotenv.config()

export const APP_M1 : string = process.env.APP_M1 || 'M1'
export const QUEUE_CALCULATE = process.env.QUEUE_CALCULATE || "queue.calculate"
export const QUEUE_RESULT = process.env.QUEQUE_RESULT || "queue.result"

export const PORT_M1 : number = parseInt(process.env.PORT_M1 || '8080')

export const RABBIT_URL : string = process.env.RABBIT_URL || 'amqp://rabbitmq'
