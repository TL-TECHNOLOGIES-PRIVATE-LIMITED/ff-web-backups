import React from 'react';
import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';
import { MAGNIFY_ICON } from '../../constants/navigation';
import { MIN_TARGET } from '../../../../../constants';

function SidebarSearchContainer(props) {
  const { showSearch, sidebarWidth, renderForm, renderMagnifyIcon, renderCloseIcon } = props;

  const styles = {
    icon: {
      pointerEvents: 'none',
      opacity: 0.4
    },
    innerContainer: {
      zIndex: 1,
      position: 'absolute',
      left: 0,
      width: MIN_TARGET,
      transition: 'width 0.3s',
      ...(showSearch && {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 'medium',
        left: sidebarWidth - 48,
        transform: 'translateY(-50%)',
        paddingRight: sidebarWidth,
        width: '100vw',
        height: 145,
        backgroundColor: 'section'
      })
    },
    searchFormWrapper: {
      position: showSearch ? 'relative' : 'unset',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%'
    }
  };

  return (
    <UX2.Element.Block style={ styles.container }>
      { showSearch && <UX2.Element.Icon icon={ MAGNIFY_ICON } style={ styles.icon } /> }
      <UX2.Element.Block style={ styles.innerContainer } section='default'>
        <UX2.Element.Block style={ styles.searchFormWrapper }>
          { renderForm() }
          { renderMagnifyIcon() }
          { renderCloseIcon() }
        </UX2.Element.Block>
      </UX2.Element.Block>
    </UX2.Element.Block>
  );
}

SidebarSearchContainer.propTypes = {
  showSearch: PropTypes.bool,
  sidebarWidth: PropTypes.number,
  renderForm: PropTypes.func,
  renderMagnifyIcon: PropTypes.func,
  renderCloseIcon: PropTypes.func
};

export default SidebarSearchContainer;
