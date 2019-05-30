import { monthNames, weekNames } from './constants';

export const getDaysOfMonth = (year, month) => {
  const current = new Date(year, month);
  const next = new Date(year, month + 1);
  const diff = (next - current) / (1000 * 3600 * 24);

  const index = (current.getDay() + 6) % 7;

  const rows = Math.ceil((index + diff) / 7);
  const cols = 7;

  const table = [];
  let k = 1 - index;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (k > 0 && k <= diff) {
        table.push({
          number: k,
          dayOfWeek: weekNames[j],
          month: monthNames[month],
          year,
        });
      }
      k++;
    }
  }
  return table;
};

export const func = function () {};
