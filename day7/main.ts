const data = Deno.readTextFileSync('data.txt');
const example = Deno.readTextFileSync('example.txt');

// replace data with example to run the example
const input = data
    .trim()
    .split('\n');

function solvePart1(input: string[]): number {
    let result = 0;

    // iterate over each line from the input
    for (const line of input) {
        // split the line into the answer and the rest of the values
        const [tmpAnswer, ...rest] = line.split(" ");
        // remove the last character to get the answer
        const answer = tmpAnswer.slice(0, -1);
        // if the first calibration is greater than 0, add the answer to the result
        if (firstCalibration(rest.slice(1), answer, Number(rest[0])) > 0) {
            result += Number(answer);
        }
    }
    return result;
}

// calibration function for part 1
function firstCalibration(values: string[], answer: string, result: number): number {
    // end of the recursion
    if (values.length === 0) {
        // return 1 if the answer is equal to the result, 0 otherwise
        return Number(answer) === result ? 1 : 0;
    }
    // if the result is greater than the answer, return 0
    if (result > Number(answer)) {
        return 0;
    }
    // recursive call for the next operations, addition and multiplication
    return firstCalibration(values.slice(1), answer, result + Number(values[0])) +
        firstCalibration(values.slice(1), answer, result * Number(values[0]));
}

function solvePart2(input: string[]): number {
    let result = 0;

    // iterate over each line from the input
    for (const line of input) {
        // split the line into the answer and the rest of the values
        const [tmpAnswer, ...rest] = line.split(" ");
        const answer = tmpAnswer.slice(0, -1);

        // if the second calibration is greater than 0, add the answer to the result
        if (secondCalibration(rest.slice(1), answer, Number(rest[0])) > 0) {
            result += Number(answer);
        }
    }
    return result;
}


// calibration function for part 2
function secondCalibration(values: string[], answer: string, result: number): number {
    // end of the recursion
    if (values.length === 0) {
        return Number(answer) === result ? 1 : 0;
    }
    if (result > Number(answer)) {
        return 0;
    }
    // recursive call for the next operations, addition, multiplication and concatenation
    return secondCalibration(values.slice(1), answer, result + Number(values[0])) +
        secondCalibration(values.slice(1), answer, result * Number(values[0])) +
        secondCalibration(values.slice(1), answer, Number(String(result) + values[0]));
}

// Run the functions
const part1Result = solvePart1(input);
console.log(`Part 1: ${part1Result}`);

const part2Result = solvePart2(input);
console.log(`Part 2: ${part2Result}`);

// adapted from https://github.com/k35o/aoc-2024-in-deno/tree/main/day7