import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class HeadingPair extends UX2.utils.createElement('HeadingPair') {
  static propTypes = {
    heading: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        children: PropTypes.string.isRequired
      })
    ]),
    subheading: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        children: PropTypes.string.isRequired
      })
    ])
  };
}
