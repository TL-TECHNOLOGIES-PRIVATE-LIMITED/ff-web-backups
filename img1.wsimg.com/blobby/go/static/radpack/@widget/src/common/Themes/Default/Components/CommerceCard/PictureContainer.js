import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import { imageShapeRatios } from '../../../../constants/imageShapeRatios';

export function CommerceCardPictureContainer({
  children,
  backgroundColor,
  imageShape,
  hasImageBorder,
  containerStyles,
  canHaveBorder,
  ...props
}) {
  const borderStyles = canHaveBorder
    ? {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: hasImageBorder ? 'section' : 'transparent'
    }
    : {};

  const styles = {
    'position': 'relative',
    'paddingTop': imageShapeRatios[imageShape] || imageShapeRatios.square,
    'paddingRight': '100%',
    ...borderStyles,
    ...containerStyles,
    ':before': {
      content: `""`,
      position: 'absolute',
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px',
      backgroundColor: backgroundColor
    },
    [':hover .hoverButton']: {
      transition: 'opacity .2s ease-in',
      opacity: 1
    }
  };

  const content = <UX2.Element.Wrapper children={ children } />;

  return this.Block(
    this.merge(
      {
        children: content,
        style: styles
      },
      props
    )
  );
}
