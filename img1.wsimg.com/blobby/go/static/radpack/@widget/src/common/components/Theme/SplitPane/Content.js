import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

const { utils } = UX2;

export default class SplitPaneContent extends utils.createElement('SplitPane', 'Content') {
  static propTypes = {
    children: PropTypes.node,
    renderAsCard: PropTypes.bool
  };

  static defaultProps = {
    renderAsCard: true
  };
}
