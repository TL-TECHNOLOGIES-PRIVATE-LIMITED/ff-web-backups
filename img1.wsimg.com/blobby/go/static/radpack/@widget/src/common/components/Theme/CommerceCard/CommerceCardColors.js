import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class CommerceCardColors extends UX2.utils.createElement('CommerceCard', 'Colors') {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    renderColorsLabel: PropTypes.func,
    isSingleMobileColumn: PropTypes.bool
  };
}
