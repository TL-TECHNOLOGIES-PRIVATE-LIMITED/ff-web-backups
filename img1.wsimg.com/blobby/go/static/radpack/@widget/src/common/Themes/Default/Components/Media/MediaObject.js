import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import { spacingHorizontal } from '../../../../utils';

export function MediaObject({ heading, subheading, media, ...props }) {
  return this.merge(
    {
      tag: UX2.Element.Block,
      children: [
        media && media.url && (
          <UX2.Component.Background key='background' backgroundImage={ media.url } />
        ),
        <UX2.Component.HeadingPair key='heading' heading={ heading } subheading={ subheading } />
      ],
      style: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        ...spacingHorizontal('medium')
      }
    },
    props
  );
}
