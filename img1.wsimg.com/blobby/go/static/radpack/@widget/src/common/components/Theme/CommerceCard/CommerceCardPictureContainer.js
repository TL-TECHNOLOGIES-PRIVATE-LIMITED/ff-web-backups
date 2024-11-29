import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';

export class CommerceCardPictureContainer extends UX2.utils.createElement(
  'CommerceCard',
  'PictureContainer'
) {
  static propTypes = {
    children: PropTypes.element,
    backgroundColor: PropTypes.string,
    imageShape: PropTypes.string,
    hasImageBorder: PropTypes.bool,
    containerStyles: PropTypes.object,
    canHaveBorder: PropTypes.bool
  };
}
