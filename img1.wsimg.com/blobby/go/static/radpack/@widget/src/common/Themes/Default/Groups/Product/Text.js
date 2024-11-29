import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function ProductName({
  product,
  getStyles = () => {
    return false;
  },
  ...props
}) {
  const isDigitalProduct = product.product_type === 'digital';
  const textFontSize = getStyles({ isProductName: true });

  const styles = {
    name: {
      'marginTop': 'small',
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'marginBottom': 'small',
      '@sm': {
        justifyContent: 'center'
      }
    },
    text: {
      textAlign: 'center',
      ...(textFontSize && { fontSize: textFontSize })
    },
    digitalProductIcon: {
      marginRight: 'xxsmall',
      verticalAlign: 'bottom',
      display: 'inline-flex'
    }
  };

  return this.Block(
    this.merge(
      {
        group: 'Product',
        groupType: 'Name',
        children: (
          <UX2.Element.Text style={ styles.text } featured>
            { isDigitalProduct && (
              <UX2.Element.Element style={ styles.digitalProductIcon }>
                <UX2.Element.Icon icon='digitalProduct' style={ styles.digitalProductIcon } />
              </UX2.Element.Element>
            ) }
            { product.name }
          </UX2.Element.Text>
        ),
        style: styles.name
      },
      props
    )
  );
}

export function ProductLabel({
  getStyles = () => {
    return false;
  },
  shipping = false,
  ...props
}) {
  const fontSize = getStyles({ isOptionOrFreeShipping: true });
  const style = {
    'marginTop': 'small',
    'textAlign': 'center',
    ...(fontSize && { fontSize }),
    '@md': {
      marginTop: 'xsmall'
    }
  };
  const sharedProps = {
    group: 'Product',
    groupType: 'Label',
    style
  };

  if (shipping === true) {
    return this.DetailsMinor(this.merge(sharedProps, props));
  }

  return this.Details(this.merge(sharedProps, props));
}
