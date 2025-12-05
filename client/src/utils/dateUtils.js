import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, 'MMM dd, yyyy') : '';
  } catch {
    return '';
  }
};

export const formatDateTime = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, 'MMM dd, yyyy hh:mm a') : '';
  } catch {
    return '';
  }
};

export const formatTime = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, 'hh:mm a') : '';
  } catch {
    return '';
  }
};

export const formatDateForInput = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd') : '';
  } catch {
    return '';
  }
};

export const formatDateTimeForInput = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, "yyyy-MM-dd'T'HH:mm") : '';
  } catch {
    return '';
  }
};
