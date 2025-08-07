import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Utility functions for date and time validation
export function isPastDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
}

export function isPastTimeSlot(timeString, selectedDate) {
  if (!moment(selectedDate).isSame(moment(), 'day')) {
    return false; // Not today, so not in the past
  }

  const now = moment();
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':');
  let hour24 = parseInt(hours);

  if (period === 'PM' && hour24 !== 12) {
    hour24 += 12;
  } else if (period === 'AM' && hour24 === 12) {
    hour24 = 0;
  }

  const slotTime = moment().hours(hour24).minutes(parseInt(minutes || 0));
  return slotTime.isBefore(now);
}

export function isValidBookingDateTime(date, timeString) {
  if (isPastDate(date)) {
    return { valid: false, message: 'Cannot book for past dates' };
  }

  if (isPastTimeSlot(timeString, date)) {
    return { valid: false, message: 'Cannot book for past time slots' };
  }

  return { valid: true, message: 'Valid booking time' };
}
