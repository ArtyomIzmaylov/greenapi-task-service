import express from "express";
import {MessageController} from "./controller/MessageContoller";
import {MessageService} from "./service/MessageService";
import {RabbitProducer} from "./producer/RabbitProducer";
import {Request, Response} from "express";

const router = express.Router();

router.post('/sendMessage', (req : Request, res : Response) => {
    new MessageController(new MessageService(new RabbitProducer())).create(req, res)
})

export default router