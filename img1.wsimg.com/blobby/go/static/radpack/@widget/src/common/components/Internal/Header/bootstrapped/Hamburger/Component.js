import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit, throttle } from 'lodash';
import { UX2, constants } from '@wsb/guac-widget-core';
import Toggle from '../common/Toggle';
import dataAids from '../../constants/dataAids';
import { ICON_SIZE, NAV_DRAWER_OFFSET } from '../../../../../constants';

const { PUBLISH } = constants.renderModes;

class Hamburger extends Component {
  constructor() {
    super(...arguments);
    this.handleChange = throttle(this.handleChange.bind(this), 100, { leading: false });

    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.toggleTarget = document.getElementById(this.props.toggleId);
    this.offsetLeft = this.toggleTarget?.offsetLeft;

    if (typeof window !== 'undefined') {
      window.addEventListener('load', this.onLoad);
    }
  }

  componentDidUpdate(prevProps, { open }) {
    const { isMobile } = this.props;

    if (open !== this.state.open) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(`NavigationDrawer${this.state.open ? 'Opened' : 'Closed'}`));
      }
      if (this.toggleTarget) {
        this.setNavigationOffset();

        if (isMobile && this.props.renderMode === PUBLISH) {
          // Hack to prevent overscroll on mobile browsers
          this.toggleMobileTouchScrolling();
        }
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', this.onLoad);
      window.removeEventListener('resize', this.onResize);
    }
  }

  onLoad = () => {
    window.addEventListener('resize', this.onResize);
  };

  onResize = () => {
    this.offsetLeft = this.toggleTarget?.offsetLeft;
    this.setNavigationOffset();
  };

  setNavigationOffset = () => {
    const { open } = this.state;
    if (!this.toggleTarget || typeof this.offsetLeft === 'undefined') {
      return;
    }

    this.toggleTarget.style.cssText = `
          visibility: visible;
          transform: ${
            open ? `translateX(-${this.offsetLeft}px)` : `translateX(${NAV_DRAWER_OFFSET})`
          };
        `;
  };

  toggleMobileTouchScrolling = () => {
    const { open } = this.state;

    if (open) {
      document.body.style.setProperty('overflow', 'hidden');
    } else {
      document.body.style.setProperty('overflow', 'initial');
    }
  };

  handleChange(open) {
    this.setState({ open });
  }

  renderIcon() {
    const { icon, openIcon } = this.props;
    const { open } = this.state;

    if (open && openIcon === 'close') return <UX2.Element.CloseIcon size={ ICON_SIZE } />;
    return (
      <UX2.Element.Icon.Hamburger icon={ open ? openIcon : icon } size={ ICON_SIZE } minTarget={ true } />
    );
  }

  render() {
    const props = omit(this.props, ['Component', 'renderMode']);
    const { style, staticContent = {} } = props;
    return (
      <Toggle
        { ...props }
        onChange={ this.handleChange }
        closeAttr='data-close'
        data-edit-interactive={ true }
        closeOnOutsideClick={ true }
        style={{ border: 0, justifyContent: 'flex-start', ...style }}
        data-aid={ dataAids.HAMBURGER_MENU_LINK }
        aria-label={ staticContent.hamburgerIcon || 'Hamburger Site Navigation Icon' }
      >
        { this.renderIcon() }
      </Toggle>
    );
  }
}

Hamburger.propTypes = {
  toggleId: PropTypes.string.isRequired,
  uniqueId: PropTypes.string.isRequired,
  icon: PropTypes.string,
  openIcon: PropTypes.string,
  style: PropTypes.object,
  staticContent: PropTypes.object,
  isMobile: PropTypes.bool,
  renderMode: PropTypes.string
};

Hamburger.defaultProps = {
  icon: 'hamburger',
  openIcon: 'hamburger',
  style: {},
  staticContent: {},
  isMobile: true
};

export default Hamburger;
