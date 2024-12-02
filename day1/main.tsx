import { data } from './data.ts';
import { example } from './example.ts';


// replace data with example to run the example
const input = data
    .trim()
    .split('\n')
    .map(line => line
        .split(/\s+/));;

const left = input.map((row) => Number(row.at(0))).sort();
const right = input.map((row) => Number(row.at(1))).sort();

function solvePart1(left: number[], right: number[]): number {
    let result = left
        .map((l, r) =>
            Math.abs(Number(l) - Number(right[r])))
        .reduce(
            (acc, curr) =>
                acc + curr,
        );
    return result;
}

function solvePart2(left: Number[], right: Number[]): number {
    let result = left
        .map((l) =>
            Number(l) * right.filter((r) => r === l).length)
        .reduce((
            acc,
            curr,
        ) => acc + curr);

    return result;
}

const part1Result = solvePart1(left, right);
console.log(`Part 1: ${part1Result}`);

const part2Result = solvePart2(left, right);
console.log(`Part 2: ${part2Result}`);