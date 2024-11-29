import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class Picture extends UX2.utils.createElement('Picture') {
  static propTypes = {
    xsSrc: PropTypes.string,
    smSrc: PropTypes.string,
    mdSrc: PropTypes.string,
    lgSrc: PropTypes.string,
    xlSrc: PropTypes.string,
    imgSrc: PropTypes.string, // fallback image, defaults to mdSrc
    imgAlt: PropTypes.string // Alt text for image
  };
}
