
export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const isSameDay = (d1: string, d2: Date) => {
  return d1 === formatDate(d2);
};

export const getMonthName = (month: number) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
};
