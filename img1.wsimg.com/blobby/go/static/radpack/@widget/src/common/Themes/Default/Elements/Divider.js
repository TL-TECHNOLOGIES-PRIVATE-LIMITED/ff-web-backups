import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function HR(props) {
  return this.merge(
    {
      tag: 'hr',
      style: {
        // Dials Based
        borderColor: 'section',
        // Theme Based
        borderBottomWidth: 'xsmall',
        // Static
        borderStyle: 'solid',
        marginVertical: '0',
        width: '100%'
      },
      ['aria-hidden']: true,
      role: 'separator'
    },
    props
  );
}

export function Divider(props) {
  return this.merge(
    {
      children: (
        <UX2.Element.Container>
          <UX2.Element.HR group='Divider' />
        </UX2.Element.Container>
      ),
      style: {
        backgroundColor: 'section'
      }
    },
    props
  );
}

export function Pipe(props) {
  return this.merge(
    {
      style: {
        width: 1,
        border: 0,
        backgroundColor: 'sectionContrast',
        height: '1em',
        display: 'inline-block'
      }
    },
    props
  );
}

export function MembershipHR(props) {
  return this.HR(props);
}
