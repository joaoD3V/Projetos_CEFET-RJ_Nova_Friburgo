const dateToString = (date: Date, addMonth: boolean = true): string => date.toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: addMonth ? 'long' : undefined,
  weekday: 'short',
})
  .replace('.', '');

export default dateToString;
