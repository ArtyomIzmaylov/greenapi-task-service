import {InputReceiver} from "./receiver/InputReceiever";
import {Consumer} from "./queue/Consumer";
import {RABBIT_URL} from "./initConfig";
import {ResultCalculationSender} from "./sender/ResultCalculationSender";
import {Calculator} from "./calculator/Calculator";


async function main() {
    while (true) {
        const resultCalculationSender =  new ResultCalculationSender()
        await resultCalculationSender.send(await new Calculator(new InputReceiver(new Consumer())).calculate())
        await resultCalculationSender.closeChannel()
    }
}
main()
