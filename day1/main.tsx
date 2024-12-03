const data = Deno.readTextFileSync('data.txt');
const example = Deno.readTextFileSync('example.txt');


// replace data with example to run the example
const input = data
    .trim()
    .split('\n')
    .map(line => line
        .split(/\s+/));;

// split the input into two arrays, one for the left side and one for the right side
const left = input.map((row) => Number(row.at(0))).sort();
const right = input.map((row) => Number(row.at(1))).sort();


// Calculate the difference between the left and right side and sum them up
function solvePart1(left: number[], right: number[]): number {
    let result = left
        // map the left and right side to the difference between the numbers
        .map((l, r) =>
            // get the absolute difference between the numbers
            Math.abs(Number(l) - Number(right[r])))
        // sum up the differences
        .reduce(
            (acc, curr) =>
                acc + curr,
        );
    return result;
}

// Multiply the left and right side with the number of times they appear in the other side
function solvePart2(left: Number[], right: Number[]): number {
    let result = left
        // map the left side to the number multiplied by the number of times it appears in the right side
        .map((l) =>
            // get the number of times the number appears in the right side
            Number(l) * right.filter((r) => r === l).length)
        // sum up the results
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
