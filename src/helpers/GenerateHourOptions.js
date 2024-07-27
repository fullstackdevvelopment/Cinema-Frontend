// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import PropTypes from 'prop-types';

function generateHourOptions({ startHour = '0', endHour = '23' }) {
  const options = [];
  let currentHour = moment().startOf('day').hour(startHour);

  while (currentHour.hour() <= endHour) {
    options.push({
      value: currentHour.format('HH:mm'),
      label: currentHour.format('HH:mm'),
    });
    currentHour = currentHour.add(1, 'hour');
  }

  return options;
}

generateHourOptions.propTypes = {
  startHour: PropTypes.string,
  endHour: PropTypes.string,
};

export default generateHourOptions;
