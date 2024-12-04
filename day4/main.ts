const data = Deno.readTextFileSync('data.txt');
const example = Deno.readTextFileSync('example.txt');

// replace data with example to run the example
const input = data
    .trim()
    .split('\n')
    .map((line) => line.split('')
        .map(String));



function solvePart1(input: String[][]): number {
    let result = 0;
    // go through the whole input array inefficiently with O(n^2) complexity
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            // check if the character is 'X'
            const char = input[i][j];
            if (char == 'X') {
                // create an array of directions to check for 'M', 'A', 'S'
                const directions = [
                    [-1, -1], [-1, 0], [-1, 1],
                    [0, -1], [0, 1],
                    [1, -1], [1, 0], [1, 1]
                ];
                // check if the next 3 characters are 'M', 'A', 'S' in any direction
                for (const [dx, dy] of directions) {
                    // using the optional chaining operator to avoid undefined errors
                    const nextChar = input[i + dx]?.[j + dy];
                    if (nextChar === 'M' && input[i + 2 * dx]?.[j + 2 * dy] === 'A' && input[i + 3 * dx]?.[j + 3 * dy] === 'S') {
                        result++;
                    }
                }
            }
        }
    }
    return result;
}

function solvePart2(input: String[][]): number {
    let result = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            // lazy way to check all the diagonals
            // using the optional chaining operator to avoid undefined errors again
            const char = input[i][j];
            const upLeft = input[i + 1]?.[j + 1];
            const downRight = input[i - 1]?.[j - 1];
            const upRight = input[i - 1]?.[j + 1];
            const downLeft = input[i + 1]?.[j - 1];
            if (char == 'A') {
                if (((upLeft === 'S' && downRight === 'M') || (upLeft === 'M' && downRight === 'S'))
                    && ((upRight === 'S' && downLeft === 'M') || (upRight === 'M' && downLeft === 'S'))) {
                    result++;
                }
            }
        }

    }
    return result;
}
// Run the functions
const part1Result = solvePart1(input);
console.log(`Part 1: ${part1Result}`);

const part2Result = solvePart2(input);
console.log(`Part 2: ${part2Result}`);
