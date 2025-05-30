
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegStatic);

const inputPath = './assets/input.mp4';
const outputPath = 'FunctionOutput.avi';

const start = Date.now();

ffmpeg()
    .input(inputPath)
    .format('avi')
    .output(outputPath)
    .on('end', () => {
        //console.log('Complete.');
        const end = Date.now();
        console.log(`Execution time for Normal Function: ${end - start} ms`);
    })
    .on('error', (err) => {
        console.error('Error:', err.message);
    })
    .run();



