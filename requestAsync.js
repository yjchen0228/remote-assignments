const https = require('https');
const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestCallback(url, callback) {
    const start = Date.now();
    https.get(url, (res) => {
        res.on('data', () => {});
        res.on('end', () => {
            const end = Date.now();
            const executionTime = end - start;
            callback(`Execution time: ${executionTime}ms`);
        });
    });
}
 
function requestPromise(url) {
    const start = Date.now();
    return new Promise((resolve) => {
        https.get(url, (res) => {
            res.on('data', () => {});
            res.on('end', () => {
                const end = Date.now();
                const executionTime = end - start;
                resolve(`Execution time: ${executionTime}ms`);
            });
        });
    });
}

async function requestAsyncAwait(url) {
    const start = Date.now();
    await requestPromise(url);
    const end = Date.now();
    const executionTime = end - start;
    console.log(`Execution time: ${executionTime}ms`);
}

const totalStart = Date.now();
requestCallback(url, console.log);
requestPromise(url).then(console.log);
requestAsyncAwait(url).then(() => {
    const totalEnd = Date.now();
    console.log(`Total execution time: ${totalEnd - totalStart}ms`);
});
