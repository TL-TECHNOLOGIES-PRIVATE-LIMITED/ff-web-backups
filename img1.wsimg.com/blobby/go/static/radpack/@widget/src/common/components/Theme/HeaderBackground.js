import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class HeaderBackground extends UX2.utils.createElement('HeaderBackground') {
  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    backgroundInfo: {
      treatmentLayout: PropTypes.string
    },
    category: PropTypes.string
  };
}
