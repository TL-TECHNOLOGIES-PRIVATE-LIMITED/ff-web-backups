import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function Ribbon({ size = { xs: 'large' }, ribbonType = 'default', dataAids, ...props }) {
  const styles = {};
  const leftOrRight = ribbonType === 'pill' ? 'left' : 'right';
  const defaultStyles = {
    paddingHorizontal: 'medium',
    paddingVertical: 'xsmall',
    top: '10px',
    [leftOrRight]: '10px'
  };

  for (const key of Object.keys(size)) {
    styles[key] =
      size[key] === 'large'
        ? {
          ...defaultStyles
        }
        : {
          paddingHorizontal: 'small',
          paddingVertical: 'xxsmall',
          top: '5px',
          [leftOrRight]: '5px'
        };
  }

  const backgroundColorTransparent = 'rgba(83, 83, 83, .6)';

  if (ribbonType === 'transparent') {
    props.category = 'accent';
    props.featured = true;
  }

  let borderRadius;
  if (ribbonType === 'roundRectangle') {
    borderRadius = 'large';
  } else if (ribbonType === 'pill') {
    borderRadius = '99em';
  }

  const style = {
    'position': 'absolute',
    'display': 'block',
    'backgroundColor': ribbonType === 'transparent' ? backgroundColorTransparent : 'section',
    'border-radius': borderRadius,
    ...defaultStyles,
    ...styles.xs,
    '@sm': {
      ...styles.sm
    },
    '@md': {
      ...styles.md
    },
    '@lg': {
      ...styles.lg
    },
    '@xl': {
      ...styles.xl
    }
  };

  return this.DetailsMinor(
    this.merge(
      {
        'style': style,
        'category': 'primary',
        'data-aid': dataAids.ribbon
      },
      props
    )
  );
}
