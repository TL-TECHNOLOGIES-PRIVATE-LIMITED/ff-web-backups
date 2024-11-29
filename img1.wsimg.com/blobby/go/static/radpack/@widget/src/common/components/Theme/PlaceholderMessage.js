import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class PlaceholderMessage extends UX2.utils.createElement('PlaceholderMessage') {
  static propTypes = {
    section: PropTypes.string,
    message: PropTypes.string,
    textProps: PropTypes.object
  };
}
