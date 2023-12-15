import express from "express";

import {Producer} from "./queque/Producer";
import {Request, Response} from "express";
import {CalculateController} from "./controller/CalculateController";
import {Consumer} from "./queque/Consumer";

const router = express.Router();

router.post('/sendMessage', (req : Request, res : Response) => {
    new CalculateController(new Producer(), new Consumer()).create(req, res)
})

export default router