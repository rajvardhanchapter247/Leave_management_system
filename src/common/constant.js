import moment from 'moment'

export const getDateTime = (data) => {
  return moment(data).format("DD-MM-YYYY ");
};

export const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}