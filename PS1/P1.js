const alphabetize = (string) => {
  let order = string.replace(/[^0-9a-z]/gi, '').split("").sort( function(x, y) {
    return x.toLowerCase().localeCompare(y.toLowerCase());
  }).join("");
  return order;
}

console.log(`Problem 1: ${alphabetize("supercalifragilisticexpialidocious")}`)
