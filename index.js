const express = require('express');
// const ffmpegStatic = require('ffmpeg-static');
// const ffmpeg = require('fluent-ffmpeg');
// const { fork } = require('child_process');

const app = express();

const { fork } = require('child_process');
const child = fork('./childprocess.js');

// const ffmpegArgs = ['-i', './assets/input.mp4', "crop=1080:1080:420:0", 'output2.mp4'];
const ffmpegArgs = ['-i', './assets/input.mp4', 'ForkOutput.avi'];

child.send({ type: 'ffmpeg', args: ffmpegArgs });

child.on('message', (message) => {
    // if (message.type === 'stdout') {
    //     console.log('FFmpeg stdout:', message.data);
    // } else if (message.type === 'stderr') {
    //     console.error('FFmpeg stderr:', message.data);
    // } else if (message.type === 'close') {
    //     console.log('FFmpeg process exited with code:', message.code);
    // }
});

child.on('exit', (code) => {
    console.log('Child process exited with code:', code);

});
































// app.get('/async', async (req, res) => {
//     ffmpeg.setFfmpegPath(ffmpegStatic);

//     const inputPath = './assets/input.mp4';
//     const outputPath = 'output1.avi';
//     const videoCodec = 'libx264';

//     const start = Date.now();

//     ffmpeg()
//         .input(inputPath)
//         .videoCodec(videoCodec)
//         .format('avi')
//         .output(outputPath)
//         .on('end', () => {
//             console.log('Complete.');
//             const end = Date.now();
//             console.log(`Execution time: ${end - start} ms`);
//         })
//         .on('error', (err) => {
//             console.error('Error:', err.message);
//         })
//         .run();
// });


// app.get('/childprocess', (req, res) => {

//     const child = fork('./childprocess.js')
//     child.send('start')
//     res.end
// });

// app.get('/', (req, res) => {
//     res.send("Hello User");
// }
// )

// app.listen(3000, () => console.log('Server is running on port 3000...'))




