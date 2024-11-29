import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class Page extends UX2.utils.createElement('Page') {
  static propTypes = {
    fixedWidth: PropTypes.bool
  };
}
