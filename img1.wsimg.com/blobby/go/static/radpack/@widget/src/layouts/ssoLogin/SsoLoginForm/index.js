import React from 'react';
import { object, string, bool } from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';
import { getQueryStringValue } from '../../../common/helpers';

import { validateWithChanges, WithError } from '../../../common/validation';
import dataAids from '../../../common/dataAids';
import Styles from '../../../common/StackedFormStyles';
import { validate } from './validation';
import RequestReset from './RequestReset';

const styles = new Styles();

const errorForCode = code => {
  return (
    {
      FAILED_CONTACT_LOGIN: 'loginIncorrectMessage'
    }[code] || 'loginErrorMessage'
  );
};

export default class SsoLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showResetPassword = this.showResetPassword.bind(this);
    this.hideResetPassword = this.hideResetPassword.bind(this);

    const errorCode = getQueryStringValue('err');

    this.state = {
      email: '',
      password: '',
      redirect: unescape(getQueryStringValue('r')),
      app: unescape(getQueryStringValue('app')) || 'website',
      busy: false,
      hasErrors: !!errorCode,
      errors: errorCode ? { form: errorForCode(errorCode) } : {}
    };
  }

  onSubmit(e) {
    this.setState({ busy: true });

    const validatedState = validateWithChanges(validate)(this.state);
    const { hasErrors } = validatedState;

    if (hasErrors) {
      e.preventDefault();
      this.setState(validatedState);
      return false;
    }
  }

  onChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  showResetPassword() {
    this.setState({ showResetPassword: true });
  }

  hideResetPassword() {
    this.setState({ showResetPassword: false });
  }

  render() {
    const { Heading, Container, Link, Text, Input, Button, Block, Error } = UX2.Element;
    const { email, password, busy, showResetPassword, redirect, app } = this.state;
    const { staticContent, membershipAccountsOn, ventureId } = this.props;
    const {
      Grid,
      Grid: { Cell }
    } = UX2.Component;
    return (
      <Container>
        { showResetPassword ? (
          <RequestReset
            onCancel={ this.hideResetPassword }
            staticContent={ staticContent }
            ventureId={ ventureId }
          />
        ) : (
          <React.Fragment>
            <Heading
              style={ styles.marginBottom }
              data-aid={ dataAids.MEMBERSHIP_SSO_TITLE_REND }
              level={ 2 }
            >
              { staticContent.ssoLoginTitle }
            </Heading>
            <Grid inset>
              <Cell>
                <Text
                  data-aid={ dataAids.MEMBERSHIP_SSO_MESSAGE_REND }
                  style={ styles.centeredMarginBottom }
                >
                  { staticContent.ssoLoginMessage }
                </Text>
                <UX2.Group.Form
                  tag='form'
                  action='/m/login'
                  method='post'
                  onSubmit={ this.onSubmit }
                  data-aid={ dataAids.MEMBERSHIP_SSO_FORM_REND }
                >
                  <Block style={ styles.marginBottom }>
                    <Input
                      tag='input'
                      type='text'
                      name='email'
                      autocomplete='email'
                      onChange={ this.onChange }
                      placeholder={ staticContent.emailPlaceholder }
                      aria-label={ staticContent.emailPlaceholder }
                      data-aid={ dataAids.MEMBERSHIP_SSO_LOGIN_EMAIL }
                      value={ email }
                    />
                    <WithError state={ this.state } field='email'>
                      { error => (
                        <Error data-aid={ dataAids.MEMBERSHIP_SSO_ERR_REND }>
                          { staticContent[error] }
                        </Error>
                      ) }
                    </WithError>
                  </Block>
                  <Block style={ styles.marginBottom }>
                    <Input
                      tag='input'
                      type='password'
                      name='password'
                      autocomplete='current-password'
                      onChange={ this.onChange }
                      placeholder={ staticContent.passwordPlaceholder }
                      aria-label={ staticContent.passwordPlaceholder }
                      data-aid={ dataAids.MEMBERSHIP_SSO_LOGIN_PASSWORD }
                      value={ password }
                    />
                    <WithError state={ this.state } field='password'>
                      { error => (
                        <Error data-aid={ dataAids.MEMBERSHIP_SSO_ERR_REND }>
                          { staticContent[error] }
                        </Error>
                      ) }
                    </WithError>
                  </Block>
                  <Input type='hidden' name='redirect' value={ redirect } />
                  <Input type='hidden' name='app' value={ app } />
                  <Block style={ styles.formButtonBlock }>
                    <Button.Primary
                      tag='button'
                      type='submit'
                      data-aid={ dataAids.MEMBERSHIP_SSO_SUBMIT }
                      disabled={ busy }
                      state={ busy ? 'disabled' : undefined } // eslint-disable-line no-undefined
                      style={ styles.marginBottom }
                    >
                      { staticContent.signIn }
                    </Button.Primary>
                    <WithError state={ this.state } field='form'>
                      { error => (
                        <Error data-aid={ dataAids.MEMBERSHIP_SSO_ERR_REND }>
                          { staticContent[error] }
                        </Error>
                      ) }
                    </WithError>
                  </Block>
                  <Block style={ styles.centeredMarginBottom }>
                    <Link
                      data-aid={ dataAids.MEMBERSHIP_SSO_REQ_RESET }
                      onClick={ this.showResetPassword }
                    >
                      { staticContent.resetPassword }
                    </Link>
                  </Block>
                </UX2.Group.Form>
                { membershipAccountsOn && (
                  <Text
                    data-aid={ dataAids.MEMBERSHIP_REQUEST_ACCESS_REND }
                    style={{ ...styles.centeredMarginBottom, ...styles.notAMember }}
                  >
                    { staticContent.notMember }{ ' ' }
                    <Link href='/m/create-account'>{ staticContent.createAccountLinkText }</Link>
                  </Text>
                ) }
              </Cell>
            </Grid>
          </React.Fragment>
        ) }
      </Container>
    );
  }
}

SsoLoginForm.propTypes = {
  staticContent: object.isRequired,
  ventureId: string.isRequired,
  membershipAccountsOn: bool
};
