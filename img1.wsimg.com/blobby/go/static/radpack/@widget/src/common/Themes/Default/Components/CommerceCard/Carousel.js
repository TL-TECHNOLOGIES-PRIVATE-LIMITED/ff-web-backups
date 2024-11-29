import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import Carousel from '@wsb/guac-widget-shared/lib/components/Carousel';
import CarouselArrow from './CarouselArrow';
import { imageShapeRatios } from '../../../../constants/imageShapeRatios';
import { ICONS } from './Constants';

export function CommerceCardCarousel({
  width,
  hasImageBorder,
  imageShape,
  carouselWidthOffset,
  imageList,
  imageCropMethod,
  ribbonComponent,
  buttonComponent,
  areControlsShown,
  currentAssetIndex,
  draggable = true,
  ...props
}) {
  const slideWidth = hasImageBorder ? width - 2 : width;

  const shapeMultiplier =
    parseFloat(imageShapeRatios[imageShape] || imageShapeRatios.square) / 100.0;
  const slideHeight = shapeMultiplier * slideWidth;

  const borderStyles = hasImageBorder
    ? {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'section'
    }
    : null;

  const componentStyles = {
    position: 'relative',
    marginBottom: 'small'
  };

  const wrapperStyles = {
    marginHorizontal: carouselWidthOffset || 0,
    [':hover .hoverButton']: {
      transition: 'opacity .2s ease-in',
      opacity: 1
    },
    ['.carousel-track']: {
      lineHeight: '0'
    }
  };

  const slides = imageList.map((image, index) => {
    return (
      <UX2.Element.Block key={ index } style={ borderStyles }>
        <UX2.Component.Background
          backgroundImage={ image }
          backgroundSize={
            ['shrink_to_fit', 'shrinkToFit'].includes(imageCropMethod) ? 'contain' : 'cover'
          }
          style={{ height: `${slideHeight}px`, width: `${slideWidth}px` }}
        />
      </UX2.Element.Block>
    );
  });

  const arrowControls = [
    {
      component: CarouselArrow,
      position: 'top',
      props: { icon: ICONS.LEFT, currentAssetIndex }
    },
    {
      component: CarouselArrow,
      position: 'bottom',
      props: { icon: ICONS.RIGHT, currentAssetIndex }
    }
  ];

  const content = (
    <>
      { slides && slideWidth && slideHeight && (
        <UX2.Element.Block style={ wrapperStyles }>
          <Carousel
            lazyLoad={ false }
            viewportWidth='100%'
            children={ slides }
            dots={ false }
            arrows={ false }
            draggable={ draggable && slides.length > 1 }
            cellPadding={ 10 }
            height={ slideHeight.toString() }
            slideWidth={ slideWidth.toString() }
            controls={ areControlsShown ? arrowControls : [] }
            infinite
          />
          { buttonComponent }
        </UX2.Element.Block>
      ) }
      { ribbonComponent }
    </>
  );

  return this.Block(
    this.merge(
      {
        children: content,
        style: componentStyles
      },
      props
    )
  );
}
