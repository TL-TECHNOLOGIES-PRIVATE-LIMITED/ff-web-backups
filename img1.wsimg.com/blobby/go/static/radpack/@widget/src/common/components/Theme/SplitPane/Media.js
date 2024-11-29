import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

const { utils } = UX2;

export default class SplitPaneMedia extends utils.createElement('SplitPane', 'Media') {
  static propTypes = {
    mediaData: PropTypes.object
  };
}
