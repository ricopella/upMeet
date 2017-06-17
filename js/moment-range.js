console.log("we're in range!");

window['moment-range'].extendMoment(moment);

const start = moment(1987);
const end = moment(2017);
const range = moment().range(start, end);

console.log("Range is: " + moment.unix(range).format("YYYY"));