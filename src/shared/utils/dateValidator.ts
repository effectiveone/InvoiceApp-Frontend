import { format, isValid, parseISO } from "date-fns";

export const convertDate = (dateToFormat: string): string => {
  const date = parseISO(dateToFormat);
  if (isValid(date)) {
    return format(date, "yyyy-MM-dd");
  } else {
    return dateToFormat;
  }
};
