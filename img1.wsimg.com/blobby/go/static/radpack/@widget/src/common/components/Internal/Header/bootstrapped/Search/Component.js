import React from 'react';
import { UX2, constants } from '@wsb/guac-widget-core';
import { uniqueId } from 'lodash';
import SearchForm from './SearchForm';
import { SEARCH_PARAMS } from '../../constants/navigation';
import SearchPropTypes from './ComponentPropTypes';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this._uniqueId = uniqueId('Search');

    this.state = {
      searchQuery: '',
      showSearch: false
    };
  }

  componentDidUpdate() {
    const { renderMode } = this.props;
    const { showSearch } = this.state;

    if (renderMode === constants.renderModes.EDIT && showSearch === true) {
      this.searchClose();
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { isShopPage, shopRoute, inNavigationDrawer } = this.props;
    const { searchQuery } = this.state;

    if (!searchQuery) {
      return;
    }
    if (!this._olsCoreUtils) {
      return (
        void this._olsCorePromise &&
        this._olsCorePromise.then(() => {
          this.handleFormSubmit(e);
        })
      );
    }

    // Remove focus from input field
    document.activeElement && document.activeElement.blur && document.activeElement.blur();

    const { OlsConfigStore, RouteHandler, ShopViewConstants, ScrollWidgetActions } =
      this._olsCoreUtils;
    const useBestMatch = OlsConfigStore.getState().use_best_match;

    if (isShopPage && !inNavigationDrawer) {
      const searchParams = { keywords: searchQuery };
      if (useBestMatch) searchParams.sortOption = 'descend_by_match';
      RouteHandler.navigate(ShopViewConstants.SEARCH_RESULTS, searchParams);
      ScrollWidgetActions.scrollShopWidget();
      this.searchClose();
    } else {
      const bestMatchQuery = useBestMatch ? '&sortOption=descend_by_match' : '';
      const queryParams = `${SEARCH_PARAMS}&keywords=${encodeURIComponent(
        searchQuery
      )}${bestMatchQuery}`;
      window.location.replace(`${shopRoute}?${queryParams}`);
    }

    return false;
  };

  handleFocus = () => {
    if (!this._olsCorePromise) {
      this._olsCorePromise = import('@wsb/guac-widget-shared/lib/common/ols-core/core-bundle').then(
        ({ OlsConfigStore, RouteHandler, ShopViewConstants, ScrollWidgetActions }) => {
          this._olsCoreUtils = {
            OlsConfigStore,
            RouteHandler,
            ShopViewConstants,
            ScrollWidgetActions
          };
        }
      );
    }
  };

  searchOpen = () => {
    setTimeout(() => {
      // Wrapped in setTimeout so that it waits until input is not disabled
      const targetField = document.getElementById(`${this._uniqueId}-input`);
      targetField.focus();
    }, 0);

    this.setState({ showSearch: true });
  };

  searchClose = () => {
    this.setState({
      showSearch: false,
      searchQuery: ''
    });
  };

  renderSearchForm() {
    const {
      isShopPage,
      shopPageId,
      renderMode,
      searchPosition,
      searchBgStyle,
      inNavigationDrawer,
      domainName,
      pageRoute,
      staticContent,
      iconSection,
      section,
      keepOpen,
      searchFormLocation,
      sidebarWidth,
      searchCategoryOverrides,
      iconStyles,
      formContainerId,
      onHomepage,
      hasNavBackground,
      navBarId
    } = this.props;
    const { showSearch, searchQuery } = this.state;

    return (
      <SearchForm
        isShopPage={ isShopPage }
        shopPageId={ shopPageId }
        renderMode={ renderMode }
        searchPosition={ searchPosition }
        searchBgStyle={ searchBgStyle }
        inNavigationDrawer={ inNavigationDrawer }
        domainName={ domainName }
        pageRoute={ pageRoute }
        showSearch={ showSearch || keepOpen }
        searchQuery={ searchQuery }
        uniqueId={ this._uniqueId }
        searchClose={ this.searchClose }
        staticContent={ staticContent }
        handleFormSubmit={ this.handleFormSubmit }
        onFocus={ this.handleFocus }
        searchInputOnChange={ newValue => this.setState(newValue) }
        iconSection={ iconSection }
        section={ section }
        searchOpen={ this.searchOpen }
        searchFormLocation={ searchFormLocation }
        sidebarWidth={ sidebarWidth }
        searchCategoryOverrides={ searchCategoryOverrides }
        iconStyles={ iconStyles }
        formContainerId={ formContainerId }
        onHomepage={ onHomepage }
        hasNavBackground={ hasNavBackground }
        navBarId={ navBarId }
      />
    );
  }

  render() {
    return (
      <UX2.Element.Block
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        { this.renderSearchForm() }
      </UX2.Element.Block>
    );
  }
}

Search.propTypes = SearchPropTypes;

Search.defaultProps = {
  keepOpen: false,
  iconStyles: {}
};

export default Search;
