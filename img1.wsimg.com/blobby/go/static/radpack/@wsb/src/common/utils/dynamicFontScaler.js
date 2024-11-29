import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

const scalerStyle = {
  wordWrap: 'normal !important',
  overflowWrap: 'normal !important',
  display: 'none',
  visibility: 'hidden',
  position: 'absolute',
  width: 'auto',
  overflow: 'visible',
  left: 0
};

export default function dynamicFontScaler({
  text,
  containerId,
  font,
  fontSizes,
  style,
  Tag = UX2.Element.Element,
  typography,
  targetId,
  maxLines = 3,
  prioritizeDefault
}) {
  const scriptProps = {
    containerId,
    targetId,
    fontSizes,
    maxLines,
    prioritizeDefault
  };
  const element = (
    <>
      { fontSizes.map(size => (
        <Tag
          tag='span'
          key={ size }
          font={ font }
          style={{ ...style, ...scalerStyle, fontSize: size }}
          data-size={ size }
          data-scaler-id={ `scaler-${ containerId }` }
          typography={ typography }
          data-ux='scaler'
          aria-hidden
        >
          { text }
        </Tag>
      )) }
    </>
  );
  return { element, scriptProps, callback: () => window.wsb.DynamicFontScaler(scriptProps) };
}
