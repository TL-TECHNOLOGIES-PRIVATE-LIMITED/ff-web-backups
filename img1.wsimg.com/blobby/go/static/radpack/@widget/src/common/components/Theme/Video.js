import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class Video extends UX2.utils.createElement('Video') {
  static propTypes = {
    ['data-field-route']: PropTypes.string,
    ['data-field-id']: PropTypes.string,
    ['data-aid']: PropTypes.string,
    url: PropTypes.string,
    poster: PropTypes.string,
    alt: PropTypes.string,
    lazyLoad: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string,
    containerStyle: PropTypes.object,
    columnCountMap: PropTypes.object
  };
}
