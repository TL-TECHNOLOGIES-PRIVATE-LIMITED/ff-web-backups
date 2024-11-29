import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import cardTypes from '../../../../constants/commerceCardTypes';

export function CommerceCardPriceDisplay({
  price,
  salePrice,
  cardType,
  priceText,
  duration,
  dataAids = {},
  isLinkShown,
  isPriceFeatured,
  strikeThroughPrice,
  styles: componentStyles,
  ...props
}) {
  const priceStateProps = salePrice && { priceState: 'expired' };

  const styles = {
    container: {
      'display': 'flex',
      'justifyContent': cardType === cardTypes.MAJOR ? 'center' : 'flex-start',
      'marginBottom': isLinkShown ? 'xxsmall' : 0,
      '@sm': {
        marginBottom: isLinkShown ? 'xsmall' : 0,
        justifyContent:
          cardType === cardTypes.MAJOR || cardType === cardTypes.MEDIUM ? 'center' : 'flex-start'
      },
      ...componentStyles
    },
    duration: {
      'display': 'inline-block',
      ':after': {
        content: `"|"`,
        marginHorizontal: 'xsmall'
      }
    },
    range: {
      display: 'inline-block',
      marginRight: 'xsmall'
    },
    original: {
      display: 'inline-block'
    },
    sale: {
      display: 'inline-block',
      marginLeft: 'xsmall'
    }
  };

  const priceComponent = strikeThroughPrice ? (
    strikeThroughPrice
  ) : (
    <>
      <UX2.Element.Price
        key='original'
        data-aid={ dataAids.price }
        style={ styles.original }
        { ...priceStateProps }
        children={ price }
      />
      { salePrice && (
        <UX2.Element.Price
          key='sale'
          data-aid={ dataAids.salePrice }
          style={ styles.sale }
          children={ salePrice }
        />
      ) }
    </>
  )

  const content = (
    <UX2.Element.Block active style={ styles.container }>
      { duration && <UX2.Element.Price children={ duration } featured style={ styles.duration } /> }
      { priceText && <UX2.Element.Price children={ priceText } featured style={ styles.range } /> }
      { priceComponent }
    </UX2.Element.Block>
  );

  return this.merge(
    {
      children: content
    },
    props
  );
}
