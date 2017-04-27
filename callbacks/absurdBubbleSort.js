const readline = require('readline');

const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

const askIfGreaterThan = (el1, el2, callback) => {
  reader.question(`Is ${el1} greater than ${el2}? `, function(response) {
    callback(response === "yes");
  });
};

const innerBubbleSortLoop = (arr, i, madeAnySwaps, outerBubbleSortLoop) => {
  if (i < arr.length - 1){
    console.log(arr);
    askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan) {
      if (isGreaterThan) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  } else if (i === arr.length - 1){
    outerBubbleSortLoop(madeAnySwaps);
  }
};

// innerBubbleSortLoop([1,2,3,4], 0, false, (madeAnySwaps) => console.log("In outer bubble sort!"));
const absurdBubbleSort = (arr, sortCompletionCallback) => {
  const outerBubbleSortLoop = (madeAnySwaps) => {
    // Begin an inner loop if you made any swaps. Otherwise, call
    // `sortCompletionCallback`.
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  };

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
  outerBubbleSortLoop(true);
};

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
