import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class Intro extends UX2.utils.createElement('Intro') {
  static propTypes = {
    alignment: PropTypes.oneOf(['left', 'center', 'right']),
    heading: PropTypes.object,
    text: PropTypes.object
  };
}
