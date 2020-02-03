export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
}

export const pageInfo = (url) => {
  let pathArray = url.split('/');
  let location = pathArray[pathArray.length-1];
  let todoParent = pathArray[pathArray.length-2];
  let type = 'page';
  if (pathArray.length == 2 && location == "") {
    type = "home";
  } else if (pathArray.length == 2) {
    type = "category";
  } else {
    type = "todo"
  }

  return {
    fullPath: url,
    pathArray: pathArray,
    location: location,
    todoParent: todoParent,
    type: type
  }
}

export const usefulDate = (dateObj, format) => {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  function addZero(n) {
    if (n < 10) {
      n = "0" + n;
    }
    return n;
  }

  const D = days[ dateObj.getDay() ];
  const d = dateObj.getDate(); // day of the week!
  const M = months[ dateObj.getMonth() ];
  const m = dateObj.getMonth() + 1;
  const Y = dateObj.getFullYear();
  const h = addZero(dateObj.getHours());
  const mn = addZero(dateObj.getMinutes());
  let date;

  switch (format) {
    case 'MDY':
      date = M + ' ' + D + ' ' + Y 
      break;
    case 'DdMY':
      date = D + ' ' + d + ' ' + M + ' ' + Y
      break;
    case 'DdmY-hm':
        date = D + ' ' + d + '/' + m + '/' + Y + ' - ' + h + ':' + mn;
        break;
    default:
      console.log('[usefulDate]: Error - Supported formats are MDY, DdMY.')
  }
  return date;
}

export const daysBetween = (startDate, endDate) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const StartDate = new Date(startDate);
  const EndDate = new Date(endDate);

  const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
  const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());

  return (start - end) / oneDay;
}