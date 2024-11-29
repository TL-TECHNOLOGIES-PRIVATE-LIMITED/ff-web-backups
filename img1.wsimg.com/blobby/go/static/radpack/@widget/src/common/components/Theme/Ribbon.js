import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class Ribbon extends UX2.utils.createElement('Ribbon') {
  static propTypes = {
    children: PropTypes.string,
    dataAids: PropTypes.objectOf(PropTypes.string),
    cardSize: PropTypes.object,
    ribbonType: PropTypes.string
  };
}
