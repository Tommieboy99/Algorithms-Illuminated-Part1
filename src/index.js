// The Grade-School Algorithm

function gradeSchoolMultiply(x, y) {
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

console.log(gradeSchoolMultiply(55, 44));

//
