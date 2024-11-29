import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class CommerceCardPicture extends UX2.utils.createElement('CommerceCard', 'Picture') {
  static propTypes = {
    backgroundAssetUrl: PropTypes.string,
    overlayAlpha: PropTypes.number,
    imageCropMethod: PropTypes.string,
    imageData: PropTypes.object,
    src: PropTypes.string,
    dataAids: PropTypes.objectOf(PropTypes.string)
  };
}
