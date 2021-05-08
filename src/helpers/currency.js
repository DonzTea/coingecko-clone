export function formatDollar(number, useDecimal = true) {
  const numberData = number.toFixed(2).split('.');
  let formatted =
    '$' +
    numberData[0]
      .split('')
      .reverse()
      .reduce(function (acc, number, i) {
        return number === '-' ? acc : number + (i && !(i % 3) ? ',' : '') + acc;
      }, '');
  if (useDecimal) formatted = formatted + '.' + numberData[1];
  return formatted;
}
