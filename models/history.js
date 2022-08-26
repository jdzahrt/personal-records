import moment from 'moment';

const historyObj = (object) => ({
  id: object._id,
  active: object.active,
  email: object.email,
  quitDate: moment(new Date(object.quitDate)).format('MM/DD/YY'),
  endDate: object.endDate ? moment(new Date(object.endDate)).format('MM/DD/YY') : null,
});

const historyListMapper = (list) => list.map((obj) => (historyObj(obj)));

const historyObjectMapper = (object) => (historyObj(object));

export { historyObjectMapper, historyListMapper };
