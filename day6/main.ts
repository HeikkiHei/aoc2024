const data = Deno.readTextFileSync('data.txt');
const example = Deno.readTextFileSync('example.txt');

// replace data with example to run the example
const input = data
    .split("\n")
    .reverse()
    .map((line) => [...line]);

// find the starting position
// same for both parts so we can reuse it
const [x0, y0] = input
    .keys()
    .flatMap((y) => input[y]
        .keys()
        .map((x) => [x, y]))
    .find(([x, y]) => input[y][x] === "^")!;

function solvePart1(input: string[][]): number {
    // create a set to store the visited positions
    const seen = new Set<string>();
    // start at the starting position
    // and move in the direction of the arrow
    for (
        let x = x0, y = y0, dx = 0, dy = 1;
        y in input && x in input[y];
        x += dx, y += dy
    ) {
        // if the next position is a wall, turn right
        while (input[y + dy]?.[x + dx] === "#") [dx, dy] = [dy, -dx];
        // add the position to the set
        seen.add(`${x},${y}`);
    }
    const result = seen.size;
    return result;
}

function solvePart2(input: string[][]): number {
    // same as part 1, but we need to check if the path loops
    const seen = new Set<string>();
    for (
        let x = x0, y = y0, dx = 0, dy = 1;
        y in input && x in input[y];
        x += dx, y += dy
    ) {
        while (input[y + dy]?.[x + dx] === "#") [dx, dy] = [dy, -dx];
        seen.add(`${x},${y}`);
    }
    // count the number of loops
    let result = 0;
    // for each position in the set
    for (const hash of seen) {
        // get the x and y coordinates
        const [x, y] = hash.split(",").map(Number);
        // if the xy is the guard position, skip it
        if (input[y][x] === "^") continue;
        // if the path loops, increment the result
        if (loops(input.with(y, input[y].with(x, "#")), x0, y0)) result++;
    }
    return result;
}

// helper function to check if the path loops
function loops(input: string[][], x0: number, y0: number) {
    // create a set to store the traveled positions 
    const traveled = new Set<string>();
    for (
        // start at the starting position
        let x = x0, y = y0, dx = 0, dy = 1;
        // while the next position is in the input
        y in input && x in input[y];
        // move in the direction of the arrow
        x += dx, y += dy
    ) {
        // if the next position is a wall, turn right
        while (input[y + dy]?.[x + dx] === "#") [dx, dy] = [dy, -dx];
        const hash = `${x},${y},${dx},${dy}`;
        // if the position has been visited before, the path loops
        if (traveled.has(hash)) return true;
        // otherwise add the position to the set
        traveled.add(hash);
    }
    return false;
}

// Run the functions
const part1Result = solvePart1(input);
console.log(`Part 1: ${part1Result}`);

const part2Result = solvePart2(input);
console.log(`Part 2: ${part2Result}`);

// adapted from https://github.com/mfulton26/adventofcode/tree/main/2024/day/6