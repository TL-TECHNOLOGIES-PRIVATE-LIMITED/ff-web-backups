import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class CardBanner extends UX2.utils.createElement('CardBanner') {
  static propTypes = {
    heading: PropTypes.string,
    headingProps: PropTypes.object,
    action: PropTypes.node
  };
}
