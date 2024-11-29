import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import { stringToChildren, spacingVertical } from '../../../../utils';

export function HeadingPair({ heading, subheading, ...props }) {
  const headingProps = heading && stringToChildren(heading);
  const subheadingProps = subheading && stringToChildren(subheading);
  return this.merge(
    {
      tag: UX2.Element.Block,
      children: [
        <UX2.Element.Heading key='heading' { ...headingProps } />,
        <UX2.Element.Heading.Sub key='sub' { ...subheadingProps } />
      ],
      style: {
        ...spacingVertical('small')
      }
    },
    props
  );
}
