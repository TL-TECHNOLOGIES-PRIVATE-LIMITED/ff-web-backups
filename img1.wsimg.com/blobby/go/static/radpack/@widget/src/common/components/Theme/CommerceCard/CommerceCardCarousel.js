import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class CommerceCardCarousel extends UX2.utils.createElement('CommerceCard', 'Carousel') {
  static propTypes = {
    width: PropTypes.number,
    hasImageBorder: PropTypes.bool,
    imageShape: PropTypes.string,
    carouselWidthOffset: PropTypes.string,
    imageList: PropTypes.array,
    imageCropMethod: PropTypes.string,
    ribbonComponent: PropTypes.object,
    buttonComponent: PropTypes.object,
    currentAssetIndex: PropTypes.number,
    draggable: PropTypes.bool
  };
}
