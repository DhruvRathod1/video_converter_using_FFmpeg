const express = require('express');
const { reject } = require('promise');
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

const { fork } = require('child_process')

const app = express();


app.get('/one', async (req, res) => {

    ffmpeg.setFfmpegPath(ffmpegStatic);

    const inputPath = './assets/input.mp4';
    const outputPath = 'FunctionOutput.avi';
    const videoCodec = 'libx264';

    const start = Date.now();

    await ffmpeg()
        .input(inputPath)
        .videoCodec(videoCodec)
        .format('avi')
        .output(outputPath)
        .on('end', () => {
            // console.log('Complete.');
            const end = Date.now();
            console.log(`Execution time for Normal Function: ${end - start} ms`);
            res.send(`Complete`)
        })
        .on('error', (err) => {
            console.error('Error:', err.message);
        })
        .run();
})

// app.get('/two', async (req, res) => {
//     const sum = await longComputePromice()
//     res.send({ sum: sum })
// });
app.get('/three', (req, res) => {

    const ffmpegArgs = ['-i', './assets/input.mp4', 'ForkOutput.avi'];
    const { fork } = require('child_process');
    const child = fork('./childprocess.js');
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
    res.send(`Complete`)

});

app.get('/', (req, res) => {
    res.send("Hello User");
}
)

app.listen(3000, () => console.log('Server is running on port 3000...'))

function longComputation() {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    } return sum;
}

function longComputePromice() {
    return new Promise((resolve, reject) => {
        let sum = 0;
        for (let i = 0; i < 1e9; i++) {
            sum += i;
        }
        resolve(sum)
    })
}
