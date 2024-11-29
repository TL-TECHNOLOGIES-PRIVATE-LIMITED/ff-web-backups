import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';
import { IMAGE, BACKGROUND, CARD_BACKGROUND } from '../../../constants/cardImageTypes';

const linkShape = PropTypes.shape({
  url: PropTypes.string,
  pageId: PropTypes.string,
  widgetId: PropTypes.string,
  linkId: PropTypes.string,
  target: PropTypes.string
});

export class ContentCard extends UX2.utils.createElement('ContentCard') {
  static propTypes = {
    id: PropTypes.string,
    heading: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        children: PropTypes.any.isRequired,
        link: linkShape
      })
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        children: PropTypes.any.isRequired,
        richtext: PropTypes.bool,
        textCollapseProps: PropTypes.shape({
          enabled: PropTypes.bool,
          renderMode: PropTypes.string.isRequired,
          collapseThreshold: PropTypes.number,
          expandIconProps: PropTypes.shape({
            children: PropTypes.any,
            ['data-aid']: PropTypes.string
          }),
          collapseIconProps: PropTypes.shape({
            children: PropTypes.any,
            ['data-aid']: PropTypes.string
          })
        })
      })
    ]),
    image: PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string,
      link: linkShape,
      shrinkToFit: PropTypes.bool,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      type: PropTypes.oneOf([IMAGE, BACKGROUND, CARD_BACKGROUND]),
      backgroundSize: PropTypes.oneOf(['contain', 'cover']),
      imageData: PropTypes.object,
      style: PropTypes.object
    }),
    action: PropTypes.shape({
      children: PropTypes.any,
      link: linkShape
    }),
    alignment: PropTypes.oneOf(['left', 'center', 'right'])
  };
}

export class ContentCards extends UX2.utils.createElement('ContentCards') {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object)
  };
}
