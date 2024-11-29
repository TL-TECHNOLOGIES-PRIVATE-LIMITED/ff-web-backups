import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export default class ModalOverlay extends UX2.utils.createElement('Modal', 'Overlay') {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object
  };
}
