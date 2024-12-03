const data = Deno.readTextFileSync('data.txt');
const example = Deno.readTextFileSync('example.txt');

// replace data with example to run the example
const input = data
    .trim()
    .split('\n')
    .map((line) => line.split(' ')
        .map(Number));


function solvePart1(input: number[][]): number {
    let result = 0;
    return result;
}

function solvePart2(input: number[][]): number {
    let result = 0;
    return result;
}

// Run the functions
const part1Result = solvePart1(input);
console.log(`Part 1: ${part1Result}`);

const part2Result = solvePart2(input);
console.log(`Part 2: ${part2Result}`);