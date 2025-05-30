const { exec } = require('child_process');

const ffmpegCommand = `ffmpeg -i assets/input.mp4 exeOutput.avi`;

const start = Date.now();
//console.log("Childprocess started");

exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error}`);
        return;
    }
    const end = Date.now();
    console.log(`Execution time for exec() method: ${end - start}`);

});