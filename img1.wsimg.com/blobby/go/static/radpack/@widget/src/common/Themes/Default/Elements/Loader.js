/* eslint-disable react/jsx-pascal-case*/
import React from 'react';
import { UX, UX2 } from '@wsb/guac-widget-core';
import keyframes from '../../../constants/keyframes';

export function Loader({ className = '', ...props }) {
  const { SVG } = UX2.Element;
  const svgProps = {
    viewBox: '0 0 64 64',
    fill: 'currentColor',
    style: {
      width: '1em',
      height: '1em'
    }
  };

  const circleProps = {
    cx: '32',
    cy: '32',
    r: '24'
  };

  return this.merge(
    {
      tag: 'div',
      className: `${className}`,
      ['data-loading-indicator']: true,
      children: (
        <React.Fragment>
          <SVG { ...svgProps }>
            <circle { ...circleProps } />
          </SVG>
          <SVG { ...svgProps }>
            <circle { ...circleProps } />
          </SVG>
          <SVG { ...svgProps }>
            <circle { ...circleProps } />
          </SVG>
          <UX.Style>{ keyframes.loaderScale }</UX.Style>
        </React.Fragment>
      ),
      style: {
        'color': 'section',
        'display': 'inline-block',
        '> svg:nth-child(1)': {
          animation: 'loaderscale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);'
        },
        '> svg:nth-child(2)': {
          animation: 'loaderscale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);'
        },
        '> svg:nth-child(3)': {
          animation: 'loaderscale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);'
        }
      }
    },
    props
  );
}
