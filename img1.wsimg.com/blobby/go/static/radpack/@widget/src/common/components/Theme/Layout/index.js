import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class SplitLayout extends UX2.utils.createElement('SplitLayout') {
  static propTypes = {
    bleed: PropTypes.bool,
    fluid: PropTypes.bool,
    reverse: PropTypes.bool,
    url: PropTypes.string,
    contentElement: PropTypes.element,
    mediaElement: PropTypes.element
  };
}

export class Box extends UX2.utils.createElement('Box') {
  static propTypes = {
    alignX: PropTypes.oneOf(['left', 'middle', 'right', 'start', 'center', 'end']),
    alignY: PropTypes.oneOf(['top', 'middle', 'bottom', 'start', 'center', 'end']),
    style: PropTypes.object,
    children: PropTypes.element
  };
}

export class VerticalBox extends UX2.utils.createElement('VerticalBox') {
  static propTypes = {
    align: Box.propTypes.alignX.isRequired,
    style: PropTypes.object,
    children: PropTypes.element
  };
}

export class HorizontalBox extends UX2.utils.createElement('HorizontalBox') {
  static propTypes = {
    align: Box.propTypes.alignX.isRequired,
    style: PropTypes.object,
    children: PropTypes.element
  };
}
