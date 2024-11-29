import React from 'react';
import { object } from 'prop-types';
import CreateAccountForm from './CreateAccountForm';
import dataAids from '../../common/dataAids';

export default class CreateAccountBootstrap extends React.Component {
  render() {
    return (
      <CreateAccountForm
        { ...this.props }
        data-aid={ dataAids.CREATE_ACCOUNT_REND }
        staticContent={ this.props.staticContent }
      />
    );
  }
}

CreateAccountBootstrap.propTypes = {
  staticContent: object.isRequired
};
