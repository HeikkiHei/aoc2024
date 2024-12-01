const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'day1_input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const lines = data.trim().split('\n');
    const parsedData = lines.map(line => line.split(/\s+/));
    const columns = parsedData[0].map((_, colIndex) => parsedData.map(row => row[colIndex]));
    const sortedColumns = columns.map(column => column.sort());
    const sumOfDifferences = sortedColumns[0].reduce((sum, value, index) => {
        const difference = Math.abs(value - sortedColumns[1][index]);
        return sum + difference;
    }, 0);

    console.log(sumOfDifferences);
    
});

