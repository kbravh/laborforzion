const day = 1000 * 60 * 60 * 24;
const week = 7 * day;
const month = 30 * day;
const year = 12 * month;

export const relativeDate = (a: Date, b: Date): string => {
  const rtf = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});
  const diff = a.getTime() - b.getTime();

  const days = Math.floor(diff / day);
  const weeks = Math.floor(diff / week);
  const months = Math.floor(diff / month);
  const years = Math.floor(diff / year);

  if (years) {
    return rtf.format(-years, 'years');
  } else if (months) {
    return rtf.format(-months, 'months')
  } else if (weeks) {
    return rtf.format(-weeks, 'weeks')
  } else if (days) {
    return rtf.format(-days, 'days')
  } else {
    return 'today'
  }
};
