const data = Deno.readTextFileSync('data.txt');
const example = Deno.readTextFileSync('example.txt');

// replace data with example to run the example
const input = data
    .trim();



function solvePart1(input: string): number {
    // find all the occurrences of the pattern mul(number1, number2)
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    // match all the occurrences of the pattern in the input string and store them in an array
    const matches = [...input.matchAll(regex)];
    let result = 0;
    // loop through the matches and multiply the two numbers together and add them to the result
    for (const part of matches) {
        // part[0] is the whole mul(number1, number2) string
        // part[1] is the first number
        // part[2] is the second number
        result += Number(part[1]!) * Number(part[2]!);
    }
    return result;
}

function solvePart2(input: string): number {
    // new regex pattern to match the previous pattern and the do() and don't() patterns
    const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
    // get all the matches of the new pattern
    const matches = [...input.matchAll(regex)];
    let result = 0;
    // start with the enabled flag set to true
    let enabled = true;

    matches.forEach((part) => {
        // part[0] is the whole function, independent of the content
        const func = part[0];
        // if the function is do(), set the enabled flag to true
        if (func === "do()") {
            enabled = true;
        // if the function is don't(), set the enabled flag to false
        } else if (func === "don't()") {
            enabled = false;
        // if the flag is enabled, the function must be mul(), so multiply the two numbers together and add them to the result
        } else if (enabled) {
            result += Number(part[1]!) * Number(part[2]!);
        }
    });
    return result;
}

// Run the functions
const part1Result = solvePart1(input);
console.log(`Part 1: ${part1Result}`);

const part2Result = solvePart2(input);
console.log(`Part 2: ${part2Result}`);