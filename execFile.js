const { execFile } = require('child_process')
const start = Date.now();
execFile('sh somefile.sh', { shell: true }, (error, stdout, stderr) => {

    const end = Date.now();
    console.log(`Execution time for execFile() method: ${end - start} ms`);


})


