import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class Background extends UX2.utils.createElement('Background') {
  static propTypes = {
    className: PropTypes.string,
    backgroundSize: PropTypes.string,
    backgroundPosition: PropTypes.string,
    style: PropTypes.object,
    imageData: PropTypes.object,
    mobileWidthMultiplier: PropTypes.number,
    desktopWidthMultiplier: PropTypes.number,
    blur: PropTypes.bool
  };

  static defaultProps = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    mobileWidthMultiplier: 1,
    desktopWidthMultiplier: 1
  };
}

export class BackgroundHalf extends UX2.utils.createElement('Background', 'Half') {
  static propTypes = {
    className: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundSize: PropTypes.string,
    backgroundPosition: PropTypes.string,
    style: PropTypes.object,
    imageData: PropTypes.object
  };

  static defaultProps = {
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
}
