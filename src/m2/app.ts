
import {Consumer} from "./queque/Consumer";
import {Producer} from "./queque/Producer";


async function main() {
    try {
        const consumer = new Consumer(new Producer())
        await consumer.consume()
    }
    catch (e) {
        console.log(e)
    }
}

main()