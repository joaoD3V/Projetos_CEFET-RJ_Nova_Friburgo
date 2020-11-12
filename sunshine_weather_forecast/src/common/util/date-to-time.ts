const dateToTime = (date: Date): string => `${date.toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})}h`;

export default dateToTime;
