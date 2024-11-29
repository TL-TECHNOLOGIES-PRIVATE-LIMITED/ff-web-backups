import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class CommerceCardOverlay extends UX2.utils.createElement('CommerceCard', 'Overlay') {
  static propTypes = {
    name: PropTypes.string,
    price: PropTypes.string,
    salePrice: PropTypes.string,
    imageUrl: PropTypes.string,
    priceText: PropTypes.string,
    productType: PropTypes.string,
    cardType: PropTypes.string,
    dataAids: PropTypes.objectOf(PropTypes.string),
    category: PropTypes.string,
    isImageShown: PropTypes.bool,
    isPriceShown: PropTypes.bool,
    linkText: PropTypes.string,
    overlayAlpha: PropTypes.number
  };
}
