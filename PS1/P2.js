const arithmetic = (equation) => {
  let split = equation.split("")
  let sign = split[1];
  let first_digit = Number(split[0]);
  let second_digit = Number(split[2]);
  return math_helper[sign](first_digit, second_digit)

}

const math_helper = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '/': function (x, y) { return x / y },
  '*': function (x, y) { return x * y }
}

console.log(`4+2: ${arithmetic('4+2')}`)
console.log(`5*7: ${arithmetic('5*7')}`)
console.log(`6-1: ${arithmetic('6-1')}`)
console.log(`9/2: ${arithmetic('9/2')}`)
