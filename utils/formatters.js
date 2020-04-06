const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const dateFormatter = (rawDate) => {
  const processedDate = new Date(rawDate);
  return `${monthNames[processedDate.getMonth()]} ${processedDate.getDate()}`;
};

module.exports = {
  dateFormatter,
};
