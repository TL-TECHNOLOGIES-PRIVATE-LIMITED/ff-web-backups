import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function Intro({ alignment = 'left', heading = {}, text = {}, ...props }) {
  const hasHeading = heading && heading.children;
  const hasIntro = text && text.children;

  if (!hasHeading && !hasIntro) {
    return null;
  }

  const introTextStyles = {
    paddingTop: hasHeading ? 'xsmall' : 0,
    ['@md']: {
      paddingTop: hasHeading ? 'small' : 0
    }
  };

  const headingStyleOverrides = {
    marginBottom: 0,
    ['@md']: {
      marginBottom: 0
    }
  };

  const introEl = hasIntro ? (
    <UX2.Component.Grid key='intro' inset={ alignment === 'center' } bottom={ false }>
      <UX2.Element.Text style={ introTextStyles } { ...text } />
    </UX2.Component.Grid>
  ) : null;

  const headingEl = hasHeading ? (
    <UX2.Element.Heading key='heading' style={ headingStyleOverrides } { ...heading } />
  ) : null;

  return this.merge(
    {
      tag: UX2.Element.Block,
      style: {
        marginBottom: hasHeading ? 'xlarge' : 'medium',
        textAlign: alignment
      },
      children: [headingEl, introEl]
    },
    props
  );
}
