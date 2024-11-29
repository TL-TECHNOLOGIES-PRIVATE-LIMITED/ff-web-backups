import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import cardTypes from '../../../../constants/commerceCardTypes';

const styles = {
  mobile: {
    'display': 'block',
    '@md': {
      display: 'none'
    }
  },
  desktop: {
    'display': 'none',
    '@md': {
      display: 'block'
    }
  }
};

export function CommerceCardOverlay({
  name,
  imageUrl,
  cardType,
  category,
  isImageShown,
  overlayAlpha,
  priceText,
  linkText,
  productType,
  isPriceShown,
  price,
  salePrice,
  dataAids,
  ...props
}) {
  let noImageCategory = 'neutral';
  let noImageBackground = 'neutral';
  if (category !== 'primary') {
    noImageCategory = 'primary';
    noImageBackground = 'primaryOverlay';
  }

  const overlayProps = isImageShown ? { category: 'accent' } : { category: noImageCategory };

  let linkCategory = 'accent';
  if (!isImageShown) {
    linkCategory = noImageCategory === 'primary' ? 'primary' : 'neutral';
  }

  const backgroundColor = isImageShown ? 'transparent' : noImageBackground;

  let CommerceOverlayComponent = UX2.Group.CommerceOverlay;
  if (cardType === cardTypes.MAJOR) {
    CommerceOverlayComponent = UX2.Group.CommerceOverlay.Major;
  } else if (cardType === cardTypes.MEDIUM) {
    CommerceOverlayComponent = UX2.Group.CommerceOverlay.Medium;
  }

  const contentProps = {
    name,
    linkCategory,
    cardType,
    isImageShown,
    isPriceFeatured: true,
    priceText,
    linkText,
    productType,
    isPriceShown,
    price,
    salePrice,
    titleProps: {
      align: cardType === cardTypes.MAJOR || cardType === cardTypes.MEDIUM ? 'center' : 'left'
    },
    dataAids
  };

  const content = (
    <CommerceOverlayComponent>
      <UX2.Component.CommerceCardPictureContainer
        backgroundColor={ backgroundColor }
        { ...overlayProps }
      >
        <>
          { isImageShown && (
            <UX2.Component.CommerceCardPicture
              backgroundAssetUrl={ imageUrl }
              overlayAlpha={ overlayAlpha }
            />
          ) }
          { cardType !== cardTypes.MAJOR && (
            <UX2.Group.CommerceOverlay.Mobile>
              <UX2.Component.CommerceCardContent { ...contentProps } style={ styles.mobile } />
            </UX2.Group.CommerceOverlay.Mobile>
          ) }
          <UX2.Component.CommerceCardContent
            { ...contentProps }
            style={ cardType === cardTypes.MAJOR ? {} : styles.desktop }
          />
        </>
      </UX2.Component.CommerceCardPictureContainer>
    </CommerceOverlayComponent>
  );

  return this.merge(
    {
      children: content
    },
    props
  );
}
