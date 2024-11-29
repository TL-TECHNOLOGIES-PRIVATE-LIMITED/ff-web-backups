import React, { Children } from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import { omit } from 'lodash';

export function GridCell(props) {
  const { tag, children, first, last, equal, column, inset } = props;
  const { Grid } = UX2.Component;

  const style = {
    boxSizing: 'border-box',
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: column ? 'auto' : '0%',
    maxWidth: '100%'
  };

  if (equal) {
    style.display = 'flex';
    style.flexWrap = 'wrap';
  }

  if (first) {
    style.order = -1;
  } else if (last) {
    style.order = 1;
  }

  const insetProps = inset ? { ...props, gridSm: 12, sm: 10, pushSm: 1, md: 8, pushMd: 2 } : props;

  Grid.Cell.applySizingStyles(style, props, this);
  Grid.Cell.applyPushPullStyles(style, insetProps);
  Grid.Cell.applySizeStyles(style, insetProps);

  return this.merge(
    {
      tag,
      style,
      children: equal
        ? Children.map(children, child =>
          React.cloneElement(child, {
            style: {
              ...(child.props && child.props.style),
              flexGrow: '1',
              flexShrink: '1',
              flexBasis: '100%'
            }
          })
        )
        : children
    },
    omit(props, Object.keys(Grid.Cell.propTypes))
  );
}
