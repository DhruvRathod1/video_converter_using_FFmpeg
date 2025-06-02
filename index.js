const express = require('express');
const { Worker } = require('node:worker_threads')
const app = express();

app.get('/non-blocking', (req, res) => {
    res.status(200).send("Hello User");
});


app.get('/blocking', async (req, res) => {
    const start = Date.now();
    const worker = new Worker("./worker.js");

    worker.on("message", (data) => {
        const end = Date.now();

        res.status(200).send(`result is ${data} ans time is ${end - start} ms`);
    });

    worker.on("error", (error) => {
        res.status(404).send(`result is ${error}`);
    });

})

app.listen(3000, () => console.log('Server is running on port 3000...'))

