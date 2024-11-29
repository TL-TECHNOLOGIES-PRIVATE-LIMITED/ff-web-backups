import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export default class ModalBody extends UX2.utils.createElement('Modal', 'Body') {
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    preventShrink: PropTypes.bool,
    width: PropTypes.number,
    closeOnClickOutside: PropTypes.bool,
    styles: PropTypes.object
  };

  static defaultProps = {
    preventShrink: false
  };
}
