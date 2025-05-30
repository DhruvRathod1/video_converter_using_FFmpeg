const os = require('os');

const cpu = os.availableParallelism();

console.log(cpu);