import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class CommerceCardPriceDisplay extends UX2.utils.createElement(
  'CommerceCard',
  'PriceDisplay'
) {
  static propTypes = {
    price: PropTypes.string.isRequired,
    salePrice: PropTypes.string,
    cardType: PropTypes.string,
    priceText: PropTypes.string,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    dataAids: PropTypes.objectOf(PropTypes.string),
    isLinkShown: PropTypes.bool,
    isPriceFeatured: PropTypes.bool
  };
}
