import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export default class Modal extends UX2.utils.createElement('Modal') {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    closeOnClickOutside: PropTypes.bool,
    preventShrink: PropTypes.bool,
    width: PropTypes.number
  };

  static defaultProps = {
    closeOnClickOutside: false,
    preventShrink: false
  };
}
