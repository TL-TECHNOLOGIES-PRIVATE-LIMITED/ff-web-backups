import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class Widget extends UX2.utils.createElement('Widget') {
  static propTypes = {
    category: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired
  };
}

export class WidgetBanner extends UX2.utils.createElement('Widget', 'Banner') {}

export class WidgetSplit extends UX2.utils.createElement('Widget', 'Split') {}

Widget.Banner = WidgetBanner;
Widget.Split = WidgetSplit;
