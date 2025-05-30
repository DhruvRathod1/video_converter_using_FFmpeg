const { spawn } = require('child_process');

process.on('message', (message) => {
    const start = Date.now();
    if (message.type === 'ffmpeg') {
        const { args } = message;
        const ffmpegProcess = spawn('ffmpeg', args);

        ffmpegProcess.stdout.on('data', (data) => {
            process.send({ type: 'stdout', data: data.toString() });
        });

        ffmpegProcess.stderr.on('data', (data) => {
            process.send({ type: 'stderr', data: data.toString() });
        });

        ffmpegProcess.on('close', (code) => {
            console.log('done');

            const end = Date.now();
            console.log(`Execution time for Spawn() method: ${end - start} ms`);
            process.send({ type: 'close', code });
        });
    }
});