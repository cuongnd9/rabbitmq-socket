const amqp = require('amqplib')
const queue = process.env.QUEUE || 'NEW_TASK'

async function publisher({ id, text }) {
    const connection = await amqp.connect(`amqp://rabbitmq:rabbitmq@rabbitmq:5672`)
    const channel = await connection.createChannel()

    await channel.assertQueue(queue, { 
        durable: false,
    })
    const message = {
        id,
        text
    }
    const sent = await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { priority: 1 });
    sent
        ? console.log(`Sent message to "${queue}" queue`, message)
        : console.log(`Fails sending message to "${queue}" queue`, message)
}

module.exports = publisher;