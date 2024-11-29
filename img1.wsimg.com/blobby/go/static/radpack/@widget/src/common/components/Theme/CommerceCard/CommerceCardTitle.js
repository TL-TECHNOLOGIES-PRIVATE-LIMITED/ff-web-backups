import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class CommerceCardTitle extends UX2.utils.createElement('CommerceCard', 'Title') {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isDigitalProduct: PropTypes.bool,
    dataAids: PropTypes.objectOf(PropTypes.string)
  };
}
