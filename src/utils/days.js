import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const calcDaysQuit = (qDate, eDate) => {
  const momentQuitDate = moment(new Date(qDate));
  const momentEndDate = eDate ? moment(new Date(eDate)) : null;
  const currentDate = moment(new Date());

  return momentEndDate ? momentEndDate.diff(momentQuitDate, 'days') : currentDate.diff(momentQuitDate, 'days');
};
