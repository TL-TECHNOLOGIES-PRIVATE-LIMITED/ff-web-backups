import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

// Renders a preview of the header treatment - used by the Editor for the HT picker
export function HeaderBackground({ backgroundImage, imageTreatments, backgroundInfo, ...props }) {
  const { treatmentLayout, overlayAlpha = 20 } = backgroundInfo;
  let style, children;
  const treatmentConfig = (imageTreatments[treatmentLayout] || '').split('-');

  if (treatmentLayout === 'Fit' || treatmentLayout === 'Fill') {
    style = {
      backgroundImage: `url("${backgroundImage.replace(/"/g, '\\"')}")`,
      backgroundSize: treatmentLayout === 'Fill' ? 'cover' : 'contain',
      width: '100%',
      height: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'relative'
    };
    if (treatmentConfig.length > 1 && treatmentConfig[1] === 'overlay') {
      children = (
        <UX2.Element.Block
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'section',
            opacity: overlayAlpha / 100
          }}
          section='default'
          category={ treatmentConfig[0] === 'category' ? props.category : treatmentConfig[0] }
        />
      );
    }
  } else {
    const imgStyle = {
      maxWidth: '60%',
      maxHeight: '60%'
    };
    children = <img src={ backgroundImage } style={ imgStyle } alt='' />;
    style = {
      backgroundColor: 'section',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    if (treatmentLayout === 'Blur') {
      style.backgroundImage = `url("${backgroundImage.replace(/"/g, '\\"')}/fx-bl=s:90")`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
    }
  }

  return this.merge(
    {
      tag: UX2.Element.Block,
      style,
      children
    },
    props
  );
}
