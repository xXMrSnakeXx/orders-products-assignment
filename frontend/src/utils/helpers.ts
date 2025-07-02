import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatCurrency = (
  value: number | string,
  currency: 'USD' | 'UAH'
): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  const formatted = num
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .replace('.', ',');

  const isInteger = formatted.endsWith(',00');
  const finalValue = isInteger ? formatted.slice(0, -3) : formatted;

  return currency === 'USD' ? `${finalValue} $` : `${finalValue} UAH`;
};

export const formatDate = (
  dateStr: string,
  formatStr: string = 'dd / LLL / yyyy'
): string => {
  const date = new Date(dateStr);
  return format(date, formatStr, { locale: ru });
};
