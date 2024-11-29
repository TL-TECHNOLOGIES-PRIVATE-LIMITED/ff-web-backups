import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class CommerceCardContent extends UX2.utils.createElement('CommerceCard', 'Content') {
  static propTypes = {
    name: PropTypes.string.isRequired,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    eventDate: PropTypes.string,
    price: PropTypes.string.isRequired,
    salePrice: PropTypes.string,
    priceText: PropTypes.string,
    productType: PropTypes.string,
    eyebrowText: PropTypes.string,
    footerText: PropTypes.string,
    footerAlert: PropTypes.bool,
    ratings: PropTypes.element,
    colors: PropTypes.array,
    renderColorsLabel: PropTypes.func,
    cardSize: PropTypes.object,
    ratingsAlignLeft: PropTypes.bool,
    titleProps: PropTypes.object,
    cardType: PropTypes.string,
    isBoxed: PropTypes.bool,
    dataAids: PropTypes.objectOf(PropTypes.string),
    dataRoutes: PropTypes.objectOf(PropTypes.string),
    buttonText: PropTypes.string,
    isLinkShown: PropTypes.bool,
    isPriceShown: PropTypes.bool,
    isImageShown: PropTypes.bool,
    linkText: PropTypes.string,
    linkCategory: PropTypes.string,
    isPriceFeatured: PropTypes.bool,
    style: PropTypes.object
  };
}
