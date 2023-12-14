import express, { Express, Request, Response } from "express";
import router from "./router";

const PORT = 8080

const app = express()
app.use(express.json())

app.use('/api', router)
async function startApp() {
    try {
        app.listen(PORT, () => console.log('Server has been started'))
    }
    catch (error) {
        console.log(error)
    }
}

startApp()