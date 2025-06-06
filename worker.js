const { parentPort } = require('worker_threads');
const fs = require('fs');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');

parentPort.on('message', async ({ filePath }) => {
    const records = [];

    try {
        const parser = fs.createReadStream(filePath).pipe(parse({
            columns: true,
            skip_empty_lines: true
        }));

        for await (const record of parser) {
            const fullName = (record['First and Last Name'] || '').trim();
            record['FirstName'] = fullName.split(/\s+/)[0] || '';
            records.push(record);
        }

        stringify(records, { header: true }, (err, output) => {
            if (err) {
                parentPort.postMessage({ status: 'error', message: err.message });
                return;
            }

            fs.writeFileSync('testdataout.csv', output);
            parentPort.postMessage({ status: 'success', data: records });
        });

    } catch (error) {
        parentPort.postMessage({ status: 'error', message: error.message });
    }
});
