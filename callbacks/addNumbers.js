const readline = require('readline');

const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

const addNumbers = (sum, numsLeft, completionCallback) => {
  if (numsLeft > 0) {
    reader.question("Enter a number: ", function(response) {
      const num = parseInt(response);
      sum += num;
      console.log(sum);

      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    completionCallback(sum);
    reader.close();
  }
};

addNumbers(0, 3, (sum) => console.log(sum));
