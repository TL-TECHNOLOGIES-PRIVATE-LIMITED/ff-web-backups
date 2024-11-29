import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class ZeroStateOverlay extends UX2.utils.createElement('ZeroStateOverlay') {
  static propTypes = {
    beforeContent: PropTypes.any,
    button: PropTypes.object,
    secondaryButton: PropTypes.object,
    afterContent: PropTypes.any,
    title: PropTypes.any,
    description: PropTypes.any
  };
}
