import React, { Children } from 'react';
import { pick } from 'lodash';
import { UX2 } from '@wsb/guac-widget-core';
import { Grid } from '../Grid';

export function SplitPane(props) {
  const {
    children,
    flip,
    split,
    fullBleed,
    style,
    roundedCorners,
    bottom = !fullBleed,
    ...otherProps
  } = props;
  const {
    Component: {
      Grid: { Cell }
    }
  } = UX2;

  let startCols,
    equal = false;

  if (split === 'start-large') {
    startCols = 8;
  } else if (split === 'end-large') {
    startCols = 4;
  } else {
    // Even split
    equal = true;
    startCols = 6;
  }

  const childArr = Children.toArray(children)
    .filter(node => {
      const type = typeof node;
      if (type === 'object') {
        return React.isValidElement(node);
      }
      if (type === 'string') {
        return !!node;
      }
    })
    .slice(0, 2);
  const content = (
    <UX2.Component.Grid
      reverse={ flip }
      bottom={ bottom }
      equal={ equal }
      gutter={ !fullBleed }
      style={{
        height: '100%',
        ...style
      }}
      { ...pick(otherProps, Object.keys(Grid.propTypes)) }
    >
      { childArr.map((child, key) => {
        const type = child && child.type;
        if (type && type.prototype) {
          if (type === Cell || type.prototype instanceof Cell) {
            return child;
          }
        }
        const sm = key === 0 || (flip && key === 1) ? startCols : 12 - startCols;
        return React.createElement(
          Cell,
          {
            key,
            equal,
            sm,
            xs: 12,
            bottom
          },
          React.cloneElement(child, { fullBleed, roundedCorners })
        );
      }) }
    </UX2.Component.Grid>
  );

  return this.merge(
    {
      tag: 'div',
      children: content
    },
    otherProps
  );
}
