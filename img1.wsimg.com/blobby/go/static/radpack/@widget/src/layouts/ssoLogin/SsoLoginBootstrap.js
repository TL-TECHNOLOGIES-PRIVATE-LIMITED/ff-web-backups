import React from 'react';
import PropTypes from 'prop-types';
import dataAids from '../../common/dataAids';
import SsoLoginForm from './SsoLoginForm';

export default class SsoLoginBootstrap extends React.Component {
  render() {
    return <SsoLoginForm { ...this.props } data-aid={ dataAids.MEMBERSHIP_SSO_FORM_REND } />;
  }
}

SsoLoginBootstrap.propTypes = {
  staticContent: PropTypes.object.isRequired,
  membershipAccountsOn: PropTypes.boolean
};
