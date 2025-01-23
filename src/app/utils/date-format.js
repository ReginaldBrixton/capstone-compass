export function safeFormat(date, formatStr) {
  const safeDate = typeof date === 'string' ? new Date(date) : date;
  return {
    iso: safeDate.toISOString(),
    formatted: Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(safeDate),
  };
}
