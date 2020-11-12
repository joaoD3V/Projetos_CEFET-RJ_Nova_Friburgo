const stringToDate = (date: string): Date => {
  const [year, month, day] = date.split('-');
  return new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  );
};

export default stringToDate;
