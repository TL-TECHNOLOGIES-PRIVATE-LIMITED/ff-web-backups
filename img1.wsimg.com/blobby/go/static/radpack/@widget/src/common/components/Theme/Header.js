import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class Header extends UX2.utils.createElement('Header') {
  static propTypes = {
    category: PropTypes.string,
    section: PropTypes.string
  };
}
