import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ArrowKeyHandler extends Component {
  static get propTypes() {
    return {
      prevSlide: PropTypes.func.isRequired,
      nextSlide: PropTypes.func.isRequired
    };
  }

  constructor() {
    super(...arguments);
    this.handleKey = this.handleKey.bind(this);
  }

  handleKey({ keyCode }) {
    const { prevSlide, nextSlide } = this.props;

    if (keyCode === 37) {
      prevSlide();
    } else if (keyCode === 39) {
      nextSlide();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey, false);
  }

  render() {
    return null;
  }
}
