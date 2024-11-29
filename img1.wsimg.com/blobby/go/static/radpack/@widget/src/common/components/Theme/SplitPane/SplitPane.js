import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

const { utils } = UX2;

export default class SplitPane extends utils.createElement('SplitPane') {
  static propTypes = {
    children: PropTypes.node,
    split: PropTypes.oneOf(['even', 'start-large', 'end-large']),
    fullBleed: PropTypes.bool,
    flip: PropTypes.bool,
    gutter: PropTypes.bool,
    spacingXs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    spacingSm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    spacingMd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    spacingLg: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    roundedCorners: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    split: 'even',
    fullBleed: false,
    flip: false,
    spacingXs: 'medium',
    spacingSm: 'medium',
    roundedCorners: false
  };
}
