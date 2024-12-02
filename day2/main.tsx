import { data } from './data.ts';
import { example } from './example.ts';

// replace data with example to run the example
const input = data
    .trim()
    .split('\n')
    .map((line) => line.split(' ')
        .map(Number));

// Check each line from the input, if the line is safe, increase the result by 1
function solvePart1(input: number[][]): number {
    let result = 0;
    for (const line of input) {
        if (isSafe(line)) {
            result += 1;
        }
    }
    return result;
}

// Check each line from the input, if the line can be made safe, increase the result by 1
function solvePart2(input: number[][]): number {
    let result = 0;
    for (const line of input) {
        if (canBeSafe(line)) {
            result += 1;
        }
    }
    return result;
}



// Check if the line is safe, by checking if all the consecutive numbers are increasing or decreasing by 1 or 3
function isSafe(line: number[]): boolean {
    let [increasing, decreasing, valid] = [true, true, true];

    for (let i = 1; i < line.length; i++) {
        // check the difference between the current number and the previous number, if it is inside the threshold of 1 or 3
        if (Math.abs(line[i] - line[i - 1]) < 1 || Math.abs(line[i] - line[i - 1]) > 3) {
            valid = false;
            break;
        }
        // check if the numbers are increasing or decreasing
        if (line[i] > line[i - 1]) {
            decreasing = false;
        }
        if (line[i] < line[i - 1]) {
            increasing = false;
        }
    }
    // return true if the numbers are increasing or decreasing and the difference between the numbers is valid
    return (increasing || decreasing) && valid;
}

function canBeSafe(line: number[]): boolean {
    // if the line is already safe, no need to check further
    if (isSafe(line)) {
        return true;
    }
    // if the line is not safe, check if removing any number from the line will make it safe
    for (let i = 0; i < line.length; i++) {
        // create a copy of the line without the current number
        // if this creates a safe line, return true, otherwise just keep on checking
        const copyArray = [...line.slice(0, i), ...line.slice(i + 1)];
        if (isSafe(copyArray)) {
            return true;
        }
    }
    // if it cannot be made safe, return false
    return false;
}


const part1Result = solvePart1(input);
console.log(`Part 1: ${part1Result}`);

const part2Result = solvePart2(input);
console.log(`Part 2: ${part2Result}`);