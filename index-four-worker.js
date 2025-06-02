const express = require('express');
const { Worker } = require('node:worker_threads')

const app = express();
THREAD_COUNT = 4;

app.get('/non-blocking', (req, res) => {
    res.send("Hello User");
})

function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./four-worker.js", {
            workerData: { thread_count: THREAD_COUNT }
        });

        worker.on("message", (data) => {
            resolve(data);

        });

        worker.on("error", (error) => {
            reject(error);

        });
    })
}

app.get('/blocking', async (req, res) => {

    const start = Date.now();

    const workerPromises = [];

    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker())
    }

    const thread_results = await Promise.all(workerPromises);
    const total = thread_results[0] + thread_results[1] + thread_results[2] + thread_results[3];

    const end = Date.now();
    res.status(200).send(`result is ${total} and Time is ${end - start} ms`);

})

app.listen(3000, () => console.log('Server is running on port 3000...'))

