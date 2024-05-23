export function appendOrdinalSuffix(i: number): string {
  const j = i % 10;
  const k = i % 100;
  let withSuffix = "";

  if (j === 1 && k !== 11) {
    withSuffix = `${i}st`;
  } else if (j === 2 && k !== 12) {
    withSuffix = `${i}nd`;
  } else if (j === 3 && k !== 13) {
    withSuffix = `${i}rd`;
  } else {
    withSuffix = `${i}th`;
  }

  return withSuffix;
}
