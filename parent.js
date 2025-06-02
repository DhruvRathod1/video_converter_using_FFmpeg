const { Worker, workerData } = require('worker_threads');
const worker = new Worker('./worker.js', { workerData: { num: 5 } });

worker.on('message', (result) => {
    console.log('squaare of 5 is:', result);
})

worker.on("error", (msg) => {
    console.log(msg);
});

console.log('hurreyy')