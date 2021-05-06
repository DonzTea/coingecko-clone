export function formatDollar(number) {
  const p = number.toFixed(2).split('.');
  return (
    '$' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, number, i) {
        return number === '-' ? acc : number + (i && !(i % 3) ? ',' : '') + acc;
      }, '')
  );
}
