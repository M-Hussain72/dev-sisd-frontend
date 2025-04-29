import moment from 'moment';

export default function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  } else {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

export function formatTimeInDays(seconds: number) {
  const duration = moment.duration(seconds, 'seconds');
  const courseDurationString =
    (duration.days() > 0 ? duration.days() + 'd ' : '') +
    (duration.hours() > 0 ? duration.hours() + 'h ' : '') +
    (duration.minutes() > 0 ? duration.minutes() + 'm ' : '');
  return courseDurationString;
}

export function formatTimeInHours(seconds: number) {
  const duration = moment.duration(seconds, 'seconds');
  const totalHours = Math.floor(duration.asHours()); // total hours, not limited to 24
  const minutes = duration.minutes(); // remainder minutes
  const courseDurationString = (totalHours > 0 ? totalHours + 'h ' : '') + (minutes > 0 ? minutes + 'm' : '');
  return courseDurationString;
}

export function formatDate(input: Date | string) {
  const date = typeof input === 'string' ? new Date(input) : input;

  if (!date) {
    return '';
  }
  // 2) Optionally guard against invalid dates
  if (Number.isNaN(date.getTime())) {
    console.warn('Invalid date passed to formatDate():', input);
    return '';
  }
  // date: a JS Date object
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const dateInString = date.toLocaleDateString('en-US', options);
  return dateInString;
}
