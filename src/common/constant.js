import moment from 'moment'

export const getDateTime = (data) => {
    return moment(data).format("DD-MM-YYYY");
  };

