import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function CardBanner({ heading, headingProps = {}, action, ...props }) {
  return this.merge(
    {
      tag: UX2.Element.Container,
      group: 'Card',
      groupType: 'Banner',
      children: (
        <React.Fragment>
          { heading && (
            <UX2.Element.Block>
              <UX2.Element.Heading level={ 2 } { ...headingProps }>
                { heading }
              </UX2.Element.Heading>
            </UX2.Element.Block>
          ) }
          { action && <UX2.Element.Block>{ action }</UX2.Element.Block> }
        </React.Fragment>
      )
    },
    props
  );
}
