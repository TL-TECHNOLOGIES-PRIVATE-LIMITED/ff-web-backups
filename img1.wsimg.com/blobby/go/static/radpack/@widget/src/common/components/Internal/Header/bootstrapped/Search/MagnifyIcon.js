import PropTypes from 'prop-types';
import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import dataAids from '../../constants/dataAids';
import { MAGNIFY_ICON } from '../../constants/navigation';
import { SEARCH_INPUT_LEFT_PADDING, ICON_SIZE } from '../../../../../constants';
import { noop } from 'lodash';

class MagnifyIcon extends React.Component {
  render() {
    const {
      section,
      iconSection,
      styles,
      showSearch,
      onSearchOpenClick,
      onSearchClosedClick,
      inNavigationDrawer,
      iconStyles
    } = this.props;

    const localStyles = {
      cursor: 'pointer',
      position: 'absolute',
      overflow: 'visible',
      ...(!inNavigationDrawer
        ? {
          'left': '0px',
          'top': 'calc(50%)',
          'transform': 'translateY(-50%)',
          '@md': {
            left: showSearch
              ? (SEARCH_INPUT_LEFT_PADDING - parseFloat(ICON_SIZE, 10)) / 2 + 'px'
              : '0px'
          }
        }
        : {})
    };

    return (
      <UX2.Element.Icon.Search
        icon={ MAGNIFY_ICON }
        data-aid={ showSearch ? dataAids.SEARCH_ICON_RENDERED_OPEN : dataAids.SEARCH_ICON_RENDERED }
        onMouseUp={ showSearch ? onSearchClosedClick : onSearchOpenClick }
        onTouchEnd={ showSearch ? onSearchClosedClick : onSearchOpenClick }
        section={ iconSection ? iconSection : section }
        style={{ ...localStyles, ...(showSearch ? {} : styles), ...iconStyles }}
        size={ ICON_SIZE }
        minTarget={ !showSearch }
      />
    );
  }
}

MagnifyIcon.propTypes = {
  section: PropTypes.string,
  iconSection: PropTypes.string,
  styles: PropTypes.object,
  showSearch: PropTypes.bool,
  onSearchOpenClick: PropTypes.func,
  inNavigationDrawer: PropTypes.bool,
  onSearchClosedClick: PropTypes.func,
  iconStyles: PropTypes.object
};

MagnifyIcon.defaultProps = {
  styles: {},
  onSearchOpenClick: noop,
  onSearchClosedClick: noop
};

export default MagnifyIcon;
