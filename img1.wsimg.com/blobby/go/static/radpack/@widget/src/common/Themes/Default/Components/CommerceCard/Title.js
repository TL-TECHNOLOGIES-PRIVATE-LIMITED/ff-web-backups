import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function CommerceCardTitle({ title, isDigitalProduct, dataAids = {}, ...props }) {
  const content = (
    <UX2.Element.Heading featured data-aid={ dataAids.name } { ...props }>
      { isDigitalProduct && <UX2.Element.Icon icon='digitalProduct' /> }
      { title }
    </UX2.Element.Heading>
  );

  return this.merge(
    {
      children: content
    },
    props
  );
}
