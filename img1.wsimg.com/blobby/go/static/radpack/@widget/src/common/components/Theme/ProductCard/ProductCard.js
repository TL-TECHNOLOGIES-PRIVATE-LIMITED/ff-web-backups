import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class ProductCard extends UX2.utils.createElement('ProductCard') {
  // TODO: add PropTypes for these inside guac-widget-core so they can be
  // shared between maniless and the component
  static propTypes = {
    assetProps: PropTypes.shape({
      banner: PropTypes.oneOfType([
        PropTypes.shape({
          text: PropTypes.string,
          productName: PropTypes.string
        }),
        PropTypes.bool
      ]),
      name: PropTypes.string,
      assets: PropTypes.array,
      defaultAssetUrl: PropTypes.string
    }),
    product: PropTypes.shape({
      'id': PropTypes.number,
      'slug': PropTypes.string,
      'name': PropTypes.string,
      'description_raw': PropTypes.string,
      'updated_at': PropTypes.string,
      'created_at': PropTypes.string,
      'currency': PropTypes.string,
      'price': PropTypes.oneOfType([
        PropTypes.shape({
          display: PropTypes.string,
          numeric: PropTypes.number,
          currency: PropTypes.string
        }),
        PropTypes.string
      ]),
      'sale_price': PropTypes.oneOfType([
        PropTypes.shape({
          display: PropTypes.string,
          numeric: PropTypes.number,
          currency: PropTypes.string
        }),
        PropTypes.string
      ]),
      'relative_url': PropTypes.string,
      'on_sale?': PropTypes.bool,
      'variant_count': PropTypes.number,
      'has_price_range': PropTypes.bool,
      'ship_free': PropTypes.bool,
      'product_type': PropTypes.string,
      'defaultAssetUrl': PropTypes.string,
      'measurement_system': PropTypes.string
    }),
    determineStyles: PropTypes.func,
    dataAids: PropTypes.objectOf(PropTypes.string),
    imageCropMethod: PropTypes.string,
    showBorder: PropTypes.bool,
    imageShape: PropTypes.string,
    translate: PropTypes.func,
    children: PropTypes.any,
    productsPerRow: PropTypes.number
  };
}
