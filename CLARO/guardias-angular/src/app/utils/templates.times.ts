export function timeFormat(value) {
  const intValue = Number(value);
  return (intValue < 10) ? '0' + intValue : value;
}


export function hourFormat(value) {
  let intHour = Number(value);
  if (24 <= intHour) {
    intHour = intHour - 24;
  } else if (0 > intHour) {
    intHour = intHour + 24;
  }

  return timeFormat(intHour);
}
