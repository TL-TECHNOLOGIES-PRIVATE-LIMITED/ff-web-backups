import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class Alert extends UX2.utils.createElement('Alert') {
  static propTypes = {
    children: PropTypes.any,
    icon: PropTypes.node,
    onClose: PropTypes.func
  };
}
