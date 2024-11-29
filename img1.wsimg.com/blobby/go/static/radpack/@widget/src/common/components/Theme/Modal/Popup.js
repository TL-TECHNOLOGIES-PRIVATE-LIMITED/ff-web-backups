import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export default class ModalPopup extends UX2.utils.createElement('Modal', 'Popup') {
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    closeOnClickOutside: PropTypes.bool,
    preventShrink: PropTypes.bool,
    width: PropTypes.number,
    styles: PropTypes.shape({
      bodyWrapper: PropTypes.object,
      body: PropTypes.object,
      content: PropTypes.object,
      closeIcon: PropTypes.object
    })
  };

  static defaultProps = {
    closeOnClickOutside: false,
    preventShrink: false
  };
}
