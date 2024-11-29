import React from 'react';
import FadeIn from '../../../Components/Theme/Bootstrapped/FadeIn';

export function Hero({ fadeIn, ...props }) {
  if (fadeIn) {
    const id = props.id || 'hero';
    return this.merge(props, {
      style: {
        opacity: 0
      },
      id,
      children: (
        <>
          { props.children }
          <FadeIn targetId={ id } renderMode={ this.base.renderMode } />
        </>
      )
    });
  }
  return props;
}

export function HeroLink(props) {
  return this.LinkContent(
    this.merge(
      {
        style: {
          color: 'inherit',
          [':hover']: { color: 'inherit' }
        }
      },
      props
    )
  );
}

export function HeroMedia(props) {
  return this.merge(
    {
      tag: 'div'
    },
    props
  );
}

export function HeroHeading(props) {
  return this.Tagline(props);
}
