import express from "express";

import {Producer} from "./queque/Producer";
import {Request, Response} from "express";
import {CalculateController} from "./controller/CalculateController";
import {Consumer} from "./queque/Consumer";
import {RequestValidator} from "./request/RequestValidator";
import {RequestConverter} from "./request/RequestConverter";
import {Calculator} from "./calculator/Calculator";

const router = express.Router();

router.post('/sendMessage', (req : Request, res : Response) => {
    new RequestValidator(req, res).validate()
    new CalculateController(
        new Calculator(new Consumer(), new Producer())
    ).create(new RequestConverter().convert(req), res)
})

export default router