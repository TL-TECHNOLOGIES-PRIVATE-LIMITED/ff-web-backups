import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class InputGroup extends UX2.utils.createElement('InputGroup') {
  static propTypes = {
    input: PropTypes.shape({
      placeholder: PropTypes.string,
      value: PropTypes.string,
      name: PropTypes.string,
      handleChange: PropTypes.func,
      style: PropTypes.object,
      ['data-route']: PropTypes.string
    }),
    button: PropTypes.shape({
      ['data-tccl']: PropTypes.string,
      ['data-aid']: PropTypes.string,
      ['data-route']: PropTypes.string,
      style: PropTypes.object,
      children: PropTypes.string
    }),
    error: PropTypes.string,
    errorProps: PropTypes.object
  };
}
