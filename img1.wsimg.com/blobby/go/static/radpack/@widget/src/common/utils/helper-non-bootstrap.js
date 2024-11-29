import getDate from './getDate';

const Weekdays = [
  new Date(2017, 9, 1), // Sun
  new Date(2017, 9, 2), // Mon
  new Date(2017, 9, 3), // Tue
  new Date(2017, 9, 4), // Wed
  new Date(2017, 9, 5), // Thu
  new Date(2017, 9, 6), // Fri
  new Date(2017, 9, 7) // Sat
];

const getPhoneUri = phone => phone && `tel:${phone.replace(/[^\d]/g, '')}`;

const toLocaleTimeString = (timeValue = '00:00', locale = 'en-US') => {
  const timeParts = timeValue.split(':');
  const hour = parseInt(timeParts[0], 10);
  const minute = parseInt(timeParts[1], 10);
  const date = getDate();
  date.setHours(hour);
  date.setMinutes(minute);
  return date.toLocaleString(locale, { hour: '2-digit', minute: '2-digit' }).toLowerCase();
};

const getWeekDayAbbr = (day, locale = 'en-US') => {
  return Weekdays[day].toLocaleDateString(locale, { weekday: 'short' });
};

export { getPhoneUri, getWeekDayAbbr, toLocaleTimeString };
