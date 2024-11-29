import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class MediaObject extends UX2.utils.createElement('MediaObject') {
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
    ]),
    media: PropTypes.shape({
      url: PropTypes.string.isRequired
    })
  };
}
