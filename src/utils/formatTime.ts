import moment from 'moment';

type FuncType = (date: Date | string | number) => string;

export const formatTime: FuncType = date =>
  `${moment(date).format('L')} - ${moment(date).format('LTS')}`;
