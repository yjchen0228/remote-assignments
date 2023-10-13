const request = require('sync-request');
const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestSync(url) {
    const start = Date.now();
    const res = request('GET', url);
    const end = Date.now();
    const executionTime = end - start;
    console.log(`Execution time: ${executionTime}ms`);
} 

const totalStart = Date.now();
requestSync(url);
requestSync(url);
requestSync(url);
const totalEnd = Date.now();
console.log(`Total execution time: ${totalEnd - totalStart}ms`);
