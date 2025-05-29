
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegStatic);

const inputPath = './assets/input.mp4';
const outputPath = 'output1.mp4';
const videoCodec = 'libx264';

const start = Date.now();

ffmpeg()
    .input(inputPath)
    .videoCodec(videoCodec)
    .format('avi')
    .output(outputPath)
    .on('end', () => {
        console.log('Complete.');
        const end = Date.now();
        console.log(`Execution time: ${end - start} ms`);
    })
    .on('error', (err) => {
        console.error('Error:', err.message);
    })
    .run();



