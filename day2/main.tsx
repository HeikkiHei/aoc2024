import { data } from './data.ts';
import { example } from './example.ts';

// replace data with example to run the example
const input = example
    .trim()
    .split('\n')
    .map((line) => line.split(' ')
        .map(Number));

function solvePart1(input: number[][]): number {
    let result = 0;
    for (const line of input) {
        let [increasing, decreasing, valid] = [true, true, true];
        
        for (let i = 1; i < line.length; i++) {
            if (line[i] > line[i - 1]) {
                decreasing = false;
            }
            if (line[i] < line[i - 1]) {
                increasing = false;
            }
            if (!increasing && !decreasing) {
                break;
            }
        }

        for (let i = 1; i < line.length; i++) {
            if (Math.abs(line[i] - line[i - 1]) < 1 || Math.abs(line[i] - line[i - 1]) > 3) {
                valid = false;
                break;
            }
        }
        
        if ((increasing || decreasing) && valid) {
            result += 1;
        }

    }
    return result;
}

function solvePart2(input: number[][]): number {
    let result = 0;
    return result;
}

const part1Result = solvePart1(input);
console.log(`Part 1: ${part1Result}`);

const part2Result = solvePart2(input);
console.log(`Part 2: ${part2Result}`);