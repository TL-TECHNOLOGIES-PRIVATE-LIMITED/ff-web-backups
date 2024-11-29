import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';
import { uniqueId } from 'lodash';

export class Rating extends UX2.utils.createElement('Rating') {
  constructor() {
    super(...arguments);
    this.keyId = uniqueId('rating');
  }

  static propTypes = {
    rating: PropTypes.number.isRequired
  };

  static defaultProps = {
    rating: 5.0
  };
}
