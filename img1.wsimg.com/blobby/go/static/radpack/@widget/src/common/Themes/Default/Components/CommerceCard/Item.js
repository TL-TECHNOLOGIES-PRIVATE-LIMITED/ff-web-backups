import React, { Fragment } from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import CarouselContainer from './CarouselContainer';
import HoverButton from './HoverButton';

export function CommerceCardItem({
  name,
  duration,
  price,
  imageUrl,
  ribbonText,
  ribbonType,
  cardSize,
  imageShape,
  imageCropMethod,
  imageData,
  imageSrc,
  imageList,
  hasImageBorder,
  productType,
  isBoxed,
  style,
  eyebrowText,
  isPriceShown,
  footerText,
  footerAlert,
  eventDate,
  buttonText,
  priceText,
  salePrice,
  ratings,
  colors,
  renderColorsLabel,
  hoverButtonText,
  onHoverButtonClick,
  dataAids,
  dataRoutes,
  ratingsAlignLeft,
  carouselWidthOffset,
  strikeThroughPrice,
  ...props
}) {
  const WrapperComponent = isBoxed ? UX2.Group.Card.Link : Fragment;
  const wrapperProps = isBoxed && { style: { flexGrow: 1, maxWidth: '100%' } };
  const commonStyles = {
    cursor: 'pointer',
    ...style
  };
  const componentStyle = isBoxed
    ? {
      display: 'flex',
      height: '100%',
      ...commonStyles
    }
    : {
      ...commonStyles
    };

  const hasImage = Boolean(imageUrl || imageData || imageSrc || imageList);

  const contentProps = {
    name,
    duration,
    price,
    productType,
    isBoxed,
    hasImage,
    eyebrowText,
    footerText,
    footerAlert,
    eventDate,
    buttonText,
    priceText,
    salePrice,
    dataAids,
    dataRoutes,
    ratings,
    colors,
    renderColorsLabel,
    cardSize,
    ratingsAlignLeft,
    strikeThroughPrice,
    titleProps: {
      align: !hasImage && isBoxed ? 'center' : 'left'
    },
    isPriceShown
  };

  const ribbonComponent = ribbonText ? (
    <UX2.Component.Ribbon dataAids={ dataAids } size={ cardSize } ribbonType={ ribbonType }>
      { ribbonText }
    </UX2.Component.Ribbon>
  ) : null;

  const buttonComponent = hoverButtonText ? (
    <HoverButton
      dataAids={ dataAids }
      hoverButtonText={ hoverButtonText }
      onHoverButtonClick={ onHoverButtonClick }
    />
  ) : null;

  const pictureComponent =
    imageList && imageList.length > 1 ? (
      <CarouselContainer
        imageCropMethod={ imageCropMethod }
        dataAids={ dataAids }
        imageList={ imageList }
        imageShape={ imageShape }
        hasImageBorder={ hasImageBorder }
        carouselWidthOffset={ carouselWidthOffset }
        ribbonComponent={ ribbonComponent }
        buttonComponent={ buttonComponent }
      />
    ) : (
      <UX2.Component.CommerceCardPictureContainer
        imageShape={ imageShape }
        containerStyles={{ marginBottom: 'small' }}
        canHaveBorder={ !isBoxed }
        hasImageBorder={ hasImageBorder }
      >
        <>
          <UX2.Component.CommerceCardPicture
            backgroundAssetUrl={ imageUrl }
            imageCropMethod={ imageCropMethod }
            imageData={ imageData }
            src={ imageSrc }
            dataAids={ dataAids }
          />
          { ribbonComponent }
          { buttonComponent }
        </>
      </UX2.Component.CommerceCardPictureContainer>
    );

  const content = (
    <WrapperComponent { ...wrapperProps }>
      <UX2.Group.CommerceItem>
        { hasImage && pictureComponent }
        <UX2.Component.CommerceCardContent { ...contentProps } />
      </UX2.Group.CommerceItem>
    </WrapperComponent>
  );

  return this.merge(
    {
      children: content,
      style: componentStyle
    },
    props
  );
}
