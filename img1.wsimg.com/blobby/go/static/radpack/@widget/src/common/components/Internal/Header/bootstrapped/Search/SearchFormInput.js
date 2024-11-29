import PropTypes from 'prop-types';
import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import dataAids from '../../constants/dataAids';
import { DESKTOP_NAV_COVER, NAV_DRAWER } from '../../constants/searchFormLocations';
import { noop } from 'lodash';

class SearchFormInput extends React.Component {
  render() {
    const {
      staticContent,
      showSearch,
      onChange,
      uniqueId,
      searchQuery,
      formSubmit,
      searchFormLocation,
      onFocus
    } = this.props;

    const group =
      searchFormLocation === DESKTOP_NAV_COVER
        ? 'SearchPopout'
        : searchFormLocation === NAV_DRAWER
          ? 'NavigationDrawer'
          : void 0;

    return (
      showSearch && (
        <UX2.Group.Form.Search section='default' onSubmit={ formSubmit }>
          <UX2.Element.Input.Search
            id={ `${uniqueId}-input` }
            data-aid={ dataAids.SEARCH_FIELD_RENDERED }
            onChange={ e => onChange({ searchQuery: e.target.value }) }
            value={ searchQuery }
            autoComplete='off'
            aria-autocomplete='none'
            name='keywords'
            placeholder={ staticContent.search_placeholder }
            aria-label={ staticContent.search_placeholder }
            group={ group }
            searchFormLocation={ searchFormLocation }
            onFocus={ onFocus }
          />
        </UX2.Group.Form.Search>
      )
    );
  }
}

SearchFormInput.propTypes = {
  staticContent: PropTypes.object,
  showSearch: PropTypes.bool,
  onChange: PropTypes.func,
  uniqueId: PropTypes.string,
  searchQuery: PropTypes.string,
  formSubmit: PropTypes.func,
  searchFormLocation: PropTypes.string,
  onFocus: PropTypes.func
};

SearchFormInput.defaultProps = {
  staticContent: {},
  onChange: noop,
  formSubmit: noop
};

export default SearchFormInput;
