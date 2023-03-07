import { format, isValid, parseISO } from "date-fns";

// export function convertDate(dateString) {
//   var date = new Date(dateString);
//   var day = date.getDate().toString().padStart(2, "0");
//   var month = (date.getMonth() + 1).toString().padStart(2, "0");
//   var year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// }

export const convertDate = (dateToFormat) => {
  const date = parseISO(dateToFormat);
  if (isValid(date)) {
    return format(date, "yyyy-MM-dd");
  } else {
    return dateToFormat;
  }
};
