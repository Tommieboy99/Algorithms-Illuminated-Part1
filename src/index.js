// The Grade-School Algorithm

function gradeSchoolMult(x, y) {
  const splitFirstDigit = x.toString().split('');
  const splitSecondDigit = y.toString().split('');

  const firstDigitArr = splitFirstDigit.map(Number);
  const secondDigitArr = splitSecondDigit.map(Number);

  const totals = [];

  for (let i = secondDigitArr.length - 1; i >= 0; i--) {
    let carry = 0;
    let products = [];

    for (let j = firstDigitArr.length - 1; j >= 0; j--) {
      const product = secondDigitArr[i] * firstDigitArr[j] + carry;
      products.unshift(product % 10);
      carry = Math.floor(product / 10);
    }

    if (carry > 0) {
      products.unshift(carry);
    }

    totals.push(products);
  }

  for (let i = 0; i < totals.length; i++) {
    for (let z = 0; z < i; z++) {
      totals[i].push(0);
    }
  }

  let longestArr = totals[0].length;

  for (let i = 1; i < totals.length; i++) {
    if (totals[i].length > longestArr) {
      longestArr = totals[i].length;
    }
  }

  for (let i = 0; i < totals.length; i++) {
    while (totals[i].length < longestArr) {
      totals[i].unshift(0);
    }
  }

  const result = [];
  let carry = 0;

  for (let col = longestArr - 1; col >= 0; col--) {
    let columnSum = carry;
    for (let row = 0; row < totals.length; row++) {
      columnSum += totals[row][col];
    }
    const digit = columnSum % 10;
    carry = Math.floor(columnSum / 10);
    result.unshift(digit);
  }

  if (carry > 0) {
    result.unshift(carry);
  }

  const output = result.join('');
  return output;
}

console.log(gradeSchoolMult(55, 44));

// Recursive Multiplication.
// Number x with an even number n of digits can be expressed in terms of two n/2-digit numbers,
// its first half and second half a and b.
// x = 1234 = 12 * 10^2 + 34
// y = 5678 = 56 * 10^2 + 78
// a = 12 (frist half of x)
// b = 34 (second half of x)
// c = 56 (first half of y)
// d = 78 (second half of y)
// So in general for any n-digit number:
// x = 10^n/2 * a + b.
// y = 10^n/2 * c + d.
// x * y = (10^n/2 * a + b) * (10^n/2 * c + d).
// multiply every term in the first parentheses by every term in the second parentheses
//       1. 10^n/2a * 10^n/2c = 10^n * (a * c)
//       2. 10^n/2a * d = 10^n/2 * (a * d)
//       3. b * 10^n/2c = 10^n/2 * (b * c)
//       4. b * d
//       = 10^n * (a * c) + 10^n/2 * (a * d + b * c) + b * d

//function recIntMult(x, y) {}
//assumption: n (the number of digits is a power of 2)
//makes splitting the number in half easier for the recursive steps.
//base case: if n = 1 then compute x * y in one step and return the result.
//if the numbers have more than one digit (n > 1)
//a. split the numbers in halves (a, b) (c, d)
//b. compute a*c, a*d, b*c, b*d

// Karatsuba Multiplication
// The big idea of Karatsuba' s algorithm
// Start with the same setup:
// x = 10^n/2 * a + b.
// y = 10^n/2 * c + d.
// x * y = 10^n * (a * c) + 10^n/2 * (a * d + b * c) + b * d
// So to compute this, we need: ac, ad, bc, bd.
// You can compute ad + bc without computing ad and bc separately.
// Step 1: a * c
// Step 2: b * d
// Step 3: (a + b)(c + d) = ac + ad + bc + bd.
// Now substract step 1 and 2: (ac + ad + bc + bd) - ac - bd = ad + bc.
// Now our products becomes: x * y = 10^n(a * c) + 10^n/2(S3 - S1 - S2) + b*d

//function karatsubaMult(x, y) {}

//Given an unsorted array as input...
//With n unique numbers, where n = 2^k.
//Create an algorithm that identifies the second-largest number in the array.
//That uses at most n + log2^n-2 comparisons.

function getSecondHighestNum(arr) {
  // Each number becomes an object with two properties:
  // value: the number itself (like 5, 9, 11…)
  // beaten: a list that will store all the numbers this player has beaten during the tournament.

  let players = arr.map((num) => ({ value: num, beaten: [] }));

  while (players.length > 1) {
    const nextRound = [];

    for (let i = 0; i < players.length; i += 2) {
      const a = players[i];
      const b = players[i + 1];

      if (a.value > b.value) {
        a.beaten.push(b.value);
        nextRound.push(a);
      } else {
        b.beaten.push(a.value);
        nextRound.push(b);
      }
    }

    players = nextRound;
  }

  // Now only one player remains — the champion (largest number)
  const winner = players[0];
  const beaten = winner.beaten;

  // Second largest = max among those the winner defeated
  let secondLargest = beaten[0];
  for (let i = 1; i < beaten.length; i++) {
    if (beaten[i] > secondLargest) {
      secondLargest = beaten[i];
    }
  }

  return secondLargest;
}

console.log(getSecondHighestNum([5, 3, 8, 9, 11, 6, 20, 4]));
