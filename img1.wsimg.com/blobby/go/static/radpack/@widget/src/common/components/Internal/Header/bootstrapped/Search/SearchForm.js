import PropTypes from 'prop-types';
import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import dataAids from '../../constants/dataAids';
import { ICON_SIZE, MIN_TARGET } from '../../../../../constants';
import {
  DESKTOP_NAV,
  DESKTOP_NAV_COVER,
  NAV_DRAWER,
  SIDEBAR
} from '../../constants/searchFormLocations';
import { noop } from 'lodash';
import SearchFormInput from './SearchFormInput';
import MagnifyIcon from './MagnifyIcon';
import PortalContainer from '../../PortalContainer';
import SidebarSearchContainer from './SidebarSearchContainer';

const alignCenter = {
  display: 'flex',
  alignItems: 'center'
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    const { searchFormLocation } = this.props;
    this.inNavigationDrawer = searchFormLocation === NAV_DRAWER;
  }

  renderMagnifyIcon = () => {
    const { showSearch, section, iconSection, searchOpen, handleFormSubmit, iconStyles } =
      this.props;

    return (
      <MagnifyIcon
        showSearch={ showSearch }
        section={ section }
        iconSection={ iconSection }
        onSearchOpenClick={ searchOpen }
        onSearchClosedClick={ handleFormSubmit }
        inNavigationDrawer={ this.inNavigationDrawer }
        iconStyles={ iconStyles }
      />
    );
  };

  renderForm = () => {
    const {
      showSearch,
      staticContent,
      uniqueId,
      searchFormLocation,
      searchInputOnChange,
      searchQuery,
      handleFormSubmit,
      onFocus
    } = this.props;

    return (
      <SearchFormInput
        showSearch={ showSearch }
        staticContent={ staticContent }
        uniqueId={ uniqueId }
        onChange={ searchInputOnChange }
        searchQuery={ searchQuery }
        formSubmit={ handleFormSubmit }
        searchFormLocation={ searchFormLocation }
        onFocus={ onFocus }
      />
    );
  };

  renderCloseIcon = () => {
    const { showSearch, keepOpen, searchClose } = this.props;
    const styles = {
      display: showSearch && !keepOpen ? 'block' : 'none',
      cursor: 'pointer',
      right: 'small',
      top: 'small',
      marginLeft: 'medium',
      ['@xs-only']: {
        marginLeft: 0,
        position: 'fixed'
      }
    };

    return (
      <UX2.Element.CloseIcon
        onClick={ searchClose }
        style={ styles }
        data-aid={ dataAids.SEARCH_CLOSE_RENDERED }
        size={ ICON_SIZE }
        minTarget={ true }
      />
    );
  };

  // eslint-disable-next-line id-length
  renderNavigationDrawerSearchContainer() {
    const { showSearch } = this.props;
    const styles = {
      container: {
        ...alignCenter,
        paddingVertical: 'xsmall',
        width: showSearch ? '100%' : MIN_TARGET
      }
    };

    return (
      <UX2.Element.Block style={ styles.container }>
        { this.renderForm() }
        { this.renderMagnifyIcon() }
      </UX2.Element.Block>
    );
  }

  renderSidebarSearchContainer() {
    const { showSearch, sidebarWidth, uniqueId } = this.props;

    return (
      <SidebarSearchContainer
        showSearch={ showSearch }
        uniqueId={ uniqueId }
        sidebarWidth={ sidebarWidth }
        renderForm={ this.renderForm }
        renderMagnifyIcon={ this.renderMagnifyIcon }
        renderCloseIcon={ this.renderCloseIcon }
      />
    );
  }

  renderDesktopSearchContainer() {
    const { searchPosition, showSearch, showBackground, searchBgStyle, searchCategoryOverrides } =
      this.props;
    const showSectionBackground = searchPosition === 'centered' || showBackground;
    const styles = {
      container: {
        ...alignCenter,
        position: 'absolute',
        zIndex: showSearch ? '1' : '0',
        right: '0px',
        top: '50%',
        paddingVertical: showSearch && !showSectionBackground ? 'small' : 0,
        backgroundColor: showSearch && showSectionBackground ? 'section' : 'transparent',
        width: showSearch ? 'calc(50vw - 80px)' : MIN_TARGET,
        transform:
          showSearch && searchPosition === 'centered' ? 'translate(60%, -50%)' : 'translateY(-50%)',
        ...(showSearch && searchBgStyle)
      },
      searchFormWrapper: {
        width: showSearch ? '100%' : MIN_TARGET
      }
    };
    let category;

    if (searchCategoryOverrides) {
      if (showSearch) {
        category = searchCategoryOverrides.openCategory;
      } else {
        category = searchCategoryOverrides.closeCategory;
      }
    }

    return (
      <UX2.Element.Block style={ styles.container }>
        <UX2.Element.Block
          style={ styles.searchFormWrapper }
          { ...(searchCategoryOverrides && { category }) }
        >
          { this.renderForm() }
          { this.renderMagnifyIcon() }
        </UX2.Element.Block>
        { this.renderCloseIcon() }
      </UX2.Element.Block>
    );
  }

  renderCoverSearchContainer() {
    const {
      searchPosition,
      showSearch,
      searchCategoryOverrides,
      formContainerId,
      onHomepage,
      hasNavBackground,
      section
    } = this.props;

    const styles = {
      formWrapper: {
        display: showSearch ? 'block' : 'none',
        zIndex: 1,
        position: 'absolute',
        right: '0px',
        top: '50%',
        width: 'calc(50vw - 80px)',
        transform: searchPosition === 'centered' ? 'translate(60%, -50%)' : 'translateY(-50%)'
      },
      navIcon: {
        width: MIN_TARGET
      }
    };

    const colorProps = { section };
    if (!hasNavBackground) {
      if (onHomepage) {
        colorProps.category = 'neutral';
      } else {
        colorProps.section = section === 'alt' ? 'default' : 'alt';
      }
    }
    if (searchCategoryOverrides) {
      colorProps.category = searchCategoryOverrides[showSearch ? 'openCategory' : 'closeCategory'];
    }

    const coverSearchForm = (
      <PortalContainer containerId={ formContainerId }>
        <UX2.Element.Block style={ styles.formWrapper }>
          <UX2.Group.SearchPopout { ...colorProps } hasBorder={ hasNavBackground }>
            { this.renderMagnifyIcon() }
            { this.renderForm() }
            { this.renderCloseIcon() }
          </UX2.Group.SearchPopout>
        </UX2.Element.Block>
      </PortalContainer>
    );

    return (
      <UX2.Element.Block>
        <UX2.Element.Block style={ styles.navIcon }>{ this.renderMagnifyIcon() }</UX2.Element.Block>
        { coverSearchForm }
      </UX2.Element.Block>
    );
  }

  render() {
    const { searchFormLocation } = this.props;

    let SearchContainer;
    switch (searchFormLocation) {
      case NAV_DRAWER:
        SearchContainer = this.renderNavigationDrawerSearchContainer();
        break;
      case SIDEBAR:
        SearchContainer = this.renderSidebarSearchContainer();
        break;
      case DESKTOP_NAV_COVER:
        SearchContainer = this.renderCoverSearchContainer();
        break;
      default:
        SearchContainer = this.renderDesktopSearchContainer();
        break;
    }

    return (
      <UX2.Element.Block
        data-aid={ dataAids.SEARCH_FORM_RENDERED }
        style={{
          width: searchFormLocation === NAV_DRAWER ? '100%' : MIN_TARGET,
          ...alignCenter,
          position: 'relative'
        }}
      >
        { SearchContainer }
      </UX2.Element.Block>
    );
  }
}

SearchForm.propTypes = {
  isShopPage: PropTypes.bool,
  shopPageId: PropTypes.string,
  shopRoute: PropTypes.string,
  searchPosition: PropTypes.string,
  showBackground: PropTypes.bool,
  keepOpen: PropTypes.bool,
  domainName: PropTypes.string,
  pageRoute: PropTypes.string,
  showSearch: PropTypes.bool,
  screenWidth: PropTypes.number,
  searchQuery: PropTypes.string,
  uniqueId: PropTypes.string,
  searchClose: PropTypes.func,
  staticContent: PropTypes.object,
  handleFormSubmit: PropTypes.func,
  searchInputOnChange: PropTypes.func,
  iconSection: PropTypes.string,
  color: PropTypes.string,
  section: PropTypes.string,
  searchOpen: PropTypes.func,
  anchorId: PropTypes.string,
  closeId: PropTypes.string,
  searchFormLocation: PropTypes.oneOf([DESKTOP_NAV, DESKTOP_NAV_COVER, NAV_DRAWER, SIDEBAR]),
  sidebarWidth: PropTypes.number,
  searchBgStyle: PropTypes.func,
  searchCategory: PropTypes.string,
  searchCategoryOverrides: PropTypes.object,
  iconStyles: PropTypes.object,
  formContainerId: PropTypes.string,
  onHomepage: PropTypes.bool,
  hasNavBackground: PropTypes.bool,
  navBarId: PropTypes.string,
  onFocus: PropTypes.func
};

SearchForm.defaultProps = {
  searchPosition: 'default',
  searchInputOnChange: noop,
  searchClose: noop,
  searchBackgroundStyle: {},
  iconStyles: {},
  shopRoute: ''
};

export default SearchForm;
