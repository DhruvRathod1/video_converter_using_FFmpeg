const express = require('express');
const { Worker } = require('worker_threads');
const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');

const app = express();
const PORT = 3000;

app.get('/non-blocking', (req, res) => {
    res.status(200).send("Hello User");
});

app.get('/blocking', (req, res) => {
    const csvFilePath = path.resolve(__dirname, 'testdata.csv');
    const start = Date.now();

    const worker = new Worker(path.resolve(__dirname, 'worker.js'));

    worker.postMessage({ filePath: csvFilePath });

    worker.once('message', (message) => {
        if (message.status === 'success') {
            console.log(`Worker Processed in ${Date.now() - start}ms`);
            res.status(200).json(message.data);
        } else {
            res.status(500).json({ error: message.message });
        }
    });

    worker.once('error', (err) => {
        console.error('Worker error:', err);
        res.status(500).json({ error: 'Worker thread error' });
    });

    worker.once('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker exited with code ${code}`);
        }
    });
});

app.get('/async', async (req, res) => {
    const csvFilePath = path.resolve(__dirname, 'testdata.csv');
    const start = Date.now();

    const records = [];

    try {
        const parser = fs.createReadStream(csvFilePath).pipe(parse({
            columns: true,
            skip_empty_lines: true
        }));

        for await (const record of parser) {
            const fullName = (record['First and Last Name'] || '').trim();
            record['FirstName'] = fullName.split(/\s+/)[0] || '';
            records.push(record);
        }

        await stringify(records, { header: true }, (err, output) => {
            if (err) {
                parentPort.postMessage({ status: 'error', message: err.message });
                return;
            }

            fs.writeFileSync('testdataoutasync.csv', output);
            console.log(`Async Processed in ${Date.now() - start}ms`);
            res.status(200).json(output);
        });

    } catch (error) {
        console.log({ error: error })
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
