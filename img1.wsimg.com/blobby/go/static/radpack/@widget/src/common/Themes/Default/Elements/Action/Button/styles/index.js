import { merge } from 'lodash';

import handleShape from './shape';
import handleFill from './fill';
import handleShadow from './shadow';
import handleDecoration from './decoration';
import sizes from './sizes';

export default function styles({ fullWidth, ...props }) {
  const {
    state = 'default',
    shape,
    fill,
    decoration,
    shadow,
    color,
    customBorderWidth = 'xsmall',
    ...otherProps
  } = props;
  const fillOpen = fill === 'OPEN';
  const commonStyles = {
    cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
    borderStyle: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textDecoration: 'none',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    position: 'relative',
    maxWidth: '100%',
    width: !fillOpen ? '100%' : 'auto',
    ['@sm']: {
      width: fullWidth && !fillOpen ? '100%' : 'auto'
    }
  };
  const buttonProps = merge(this.getButtonDefaults(), {
    shape,
    fill,
    decoration,
    shadow,
    color,
    customBorderWidth,
    state
  });

  return this.merge(
    {},
    props,
    { style: commonStyles },
    ...[sizes, handleShape, handleFill, handleDecoration, handleShadow].map(trait =>
      trait.call(this, { ...otherProps, ...buttonProps })
    )
  );
}
