import { Moment } from 'moment';
import moment from 'moment-timezone';

export const doesDatesOverlap = (a_start: Moment, a_end: Moment, b_start: Moment, b_end: Moment) => {
  if (b_start.isBetween(a_start, a_end, undefined, '[)')) return true; // b starts in a
  if (b_end.isBetween(a_start, a_end, undefined, '(]')) return true; // b ends in a
  if (a_start.isBetween(b_start, b_end, undefined, '[)')) return true; // a starts in b
  if (a_end.isBetween(b_start, b_end, undefined, '(]')) return true; // a ends in b

  return false;
};

export const setTimeToDate = (date: moment.Moment, time: string, timeZone: string) => {
  const formattedTime = moment(time, 'hh:mm:ss');
  return moment(date)
    .tz(timeZone)
    .set('hours', formattedTime.get('hours'))
    .set('minutes', formattedTime.get('minutes'))
    .set('seconds', 0);
};

export const setTimeOffsetToDate = (date: Moment, time: string, timeZone: string) => {
  const formattedTime = moment(time, 'hh:mm:ss');
  const formattedDate = moment.tz(timeZone).set('hours', formattedTime.get('hours')).set('minutes', formattedTime.get('minutes'));

  return date
    .clone()
    .set('hours', formattedDate.utc().get('hours'))
    .set('minutes', formattedDate.utc().get('minutes'))
    .set('seconds', 0)
    .set('milliseconds', 0);
};

export const divideTimeDiffIntoGrid = (startTime: string, endTime: string, duration: number) => {
  const formattedStartTime = moment(startTime, 'hh:mm:ss');
  const formattedEndTime = moment(endTime, 'hh:mm:ss');
  const timesDiff = formattedEndTime.diff(formattedStartTime, 'minutes');

  return Math.floor(timesDiff / duration);
};
