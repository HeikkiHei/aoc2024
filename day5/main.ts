const data = Deno.readTextFileSync('data.txt');
const example = Deno.readTextFileSync('example.txt');

const [part1, part2] = data.split('\n\n');

// split the input into two parts, as there's the first part for page order and second part for updates
const pages = part1
    .trim()
    .split('\n')
    .map((line) => line.split('|')
        .map(Number));

const updates = part2
    .trim()
    .split('\n')
    .map((line) => line.split(',')
        .map(Number));


function solvePart1(pages: number[][], updates: number[][]): number {
    // create a function that checks if the order of the pages in updates are valid
    const validUpdates = updates.filter((update) => {
        // check every page order in the update
        return pages.every((pageOrder) => {
            // get the left and right page numbers, i.e. from 1|2 from the original are leftNum|rightNum
            const [leftNum, rightNum] = pageOrder;
            // check if the index of leftPage is before rightPage, or if either of them are not in the update and can be skipped
            const leftPage = update.indexOf(leftNum);
            const rightPage = update.indexOf(rightNum);
            return leftPage === -1 || rightPage === -1 || leftPage < rightPage;
        });
    });

    let result = 0;
    // get the middle number of the valid updates and sum them up
    validUpdates.forEach((updates) => {
        const middleNumber = Math.floor(updates.length / 2);
        result += updates[middleNumber];
    });
    return result;
}

function solvePart2(pages: number[][], updates: number[][]): number {
    let result = 0;
    // go through the updates and find all the defective ones
    for (const update of updates) {
        let correct = true;
        // get the correct page orders
        const pageOrder = pages.filter((page) => page.every((num) => update.includes(num)));
        // go through the updates and check if the order is incorrect
        for (const num of update) {
            for (const [leftNum, rightNum] of pageOrder.filter((r) => num == r[0])) {
                const leftPage = update.indexOf(leftNum);
                const rightPage = update.indexOf(rightNum);
                // compared to part 1, this finds the incorrect order and fixes it
                if (rightPage < leftPage && rightPage !== -1) {
                    // mark the order as incorrect and fix it
                    correct = false;
                    // remove the left page and insert it after the right page
                    update.splice(leftPage, 1);
                    // insert the left page after the right page
                    update.splice(rightPage, 0, leftNum);
                }
            }
        }
        const middle = update[(update.length - 1) / 2];
        if (!correct) result += middle; 
    }
    return result;
}

// Run the functions
const part1Result = solvePart1(pages, updates);
console.log(`Part 1: ${part1Result}`);

const part2Result = solvePart2(pages, updates);
console.log(`Part 2: ${part2Result}`);