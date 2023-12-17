import * as dotenv from 'dotenv';
dotenv.config()

export const APP_M2 : string = process.env.APP_M1 || 'M2'
export const QUEUE_CALCULATE = process.env.QUEUE_CALCULATE || "queue.calculate"
export const QUEUE_RESULT = process.env.QUEUE_RESULT || "queue.result"



export const RABBIT_URL : string = process.env.RABBIT_URL || 'amqp://rabbitmq'


