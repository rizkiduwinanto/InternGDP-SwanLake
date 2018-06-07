export default function convertDate(date) {
  var year = date.getFullYear();
  var yearString = year.toString(); 
  var month = (date.getMonth() + 1);
  var monthString = month > 10 ? month.toString() : '0' + month.toString();
  var day = date.getDate();
  var dayString = day > 10 ? day.toString() : '0' + day.toString();
  return yearString + '-' + monthString + '-' + dayString;
}