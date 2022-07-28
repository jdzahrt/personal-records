import moment from 'moment';

export const calcDaysQuit = (qDate, eDate) => {
  const momentQuitDate = moment(new Date(qDate), 'YYYY-MM-DD');
  const momentEndDate = eDate ? moment(new Date(eDate), 'YYYY-MM-DD') : null;
  const currentDate = moment(new Date(), 'YYYY-MM-DD');

  return momentEndDate ? momentEndDate.diff(momentQuitDate, 'days') : currentDate.diff(momentQuitDate, 'days');
};
