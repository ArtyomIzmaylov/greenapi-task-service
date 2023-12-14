import {Request, Response} from "express";
import {MessageServiceInterface} from "../interface/ServiceInterface";
import {PayloadInterface} from "../interface/Interface";

export class MessageController {
    private messageService: MessageServiceInterface;
    constructor(messageService : MessageServiceInterface) {
        this.messageService = messageService
    }
    async create(req : Request, res : Response)  {
        try {

            const data : PayloadInterface = {
                requestId : req.headers['x-request-id'],
                id : req.body.id,
                name : req.body.name,
                lastname : req.body.lastname,
                description : req.body.description

            };
            console.log(req.headers)
            console.log(data)
            const post = await this.messageService.send(data);
            res.json(data);
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }
}
