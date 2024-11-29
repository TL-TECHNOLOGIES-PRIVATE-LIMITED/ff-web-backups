import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function ProductCard({
  assetProps,
  product,
  determineStyles,
  dataAids = {},
  imageCropMethod,
  translate,
  children,
  productsPerRow,
  ...props
}) {
  const { renderMode } = props;
  const getStyles =
    Number(productsPerRow) && determineStyles
      ? determineStyles.bind(null, productsPerRow)
      : () => {
        return false;
      };

  const commonProps = {
    product,
    getStyles,
    translate
  };

  return this.merge(
    {
      tag: UX2.Element.Block,
      group: 'Product',
      groupType: 'Card',
      children: [
        <UX2.Group.Product.Asset
          key='asset'
          { ...assetProps }
          dataAids={ dataAids }
          imageCropMethod={ imageCropMethod }
        />,
        <UX2.Group.Product.Name key='name' product={ product } getStyles={ getStyles } />,
        <UX2.Group.Product.Prices
          key='price'
          { ...commonProps }
          renderMode={ renderMode }
          dataAids={ dataAids }
        />,
        product.variant_count && product.variant_count >= 2 ? (
          <UX2.Group.Product.Label
            key='options'
            children={ `[${translate('products.more_options')}]` }
            getStyles={ getStyles }
            data-aid={ dataAids.options }
          />
        ) : null,
        product.ship_free && (
          <UX2.Group.Product.Label
            key='shipping'
            shipping={ true }
            children={ translate('products.free_shipping') }
            getStyles={ getStyles }
            data-aid={ dataAids.shipFree }
          />
        )
      ].concat(children)
    },
    props
  );
}
