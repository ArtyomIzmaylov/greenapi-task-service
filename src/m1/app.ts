import express from "express";
import router from "./router";
import {PORT_M1} from "./initConfig"


const app = express()
app.use(express.json())
app.use('/api', router)
async function startApp() {
    try {
        app.listen(PORT_M1, () => console.log('Server has been started'))
    }
    catch (error) {
        console.log(error)
    }
}

startApp()