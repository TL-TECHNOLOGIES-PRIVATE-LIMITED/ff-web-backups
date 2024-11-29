import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import { object, string, func } from 'prop-types';
import createClient from '../../../connections/client';
import dataAids from '../../../common/dataAids';
import { getQueryStringValue } from '../../../common/helpers';
import Styles from '../../../common/StackedFormStyles';
import { validateWithChanges, addError, WithError } from '../../../common/validation';
import { validateRequestReset as validate } from './validation';

const styles = new Styles();

class RequestReset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      busy: false,
      redirect: unescape(getQueryStringValue('r'))
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState(validateWithChanges(validate), () => {
      const { email, hasErrors, redirect } = this.state;
      const { ventureId } = this.props;

      if (hasErrors) {
        return;
      }

      const ravenClient = createClient({ baseUrl: `/m/api/crm` });
      this.setState({ busy: true });
      ravenClient
        .requestPasswordReset({ ventureId, email, redirect, source: 'WEBSITE_BUILDER' })
        .then(() => {
          this.setState({ successful: true });
        })
        .catch(() => {
          this.setState({ busy: false });
          this.setState(addError('form', 'requestResetErrorMessage'));
        });
    });
  }

  render() {
    const { Block, Heading, Text, Input, Button, Link, Error } = UX2.Element;
    const {
      Grid,
      Grid: { Cell }
    } = UX2.Component;
    const { staticContent, onCancel } = this.props;
    const { email, busy, successful } = this.state;

    const title = successful ? staticContent.requestAccessSentTitle : staticContent.resetPassword;
    const message = successful
      ? staticContent.resetEmailSentMessage
      : staticContent.resetEmailMessage;

    return (
      <Block>
        <Heading style={ styles.marginBottom } data-aid={ dataAids.MEMBERSHIP_REQ_RESET_TITLE_REND }>
          { title }
        </Heading>
        <Grid inset>
          <Cell>
            <Text
              data-aid={ dataAids.MEMBERSHIP_REQ_RESET_MESSAGE_REND }
              style={ styles.centeredMarginBottom }
            >
              { message }
            </Text>
            { successful || (
              <React.Fragment>
                <UX2.Group.Form
                  tag='form'
                  onSubmit={ this.onSubmit }
                  data-aid={ dataAids.MEMBERSHIP_REQ_RESET_FORM_REND }
                  style={{ ...styles.flexContainer, ...styles.formContainer }}
                >
                  <Block style={ styles.marginBottom }>
                    <Input
                      tag='input'
                      type='text'
                      name='email'
                      onChange={ this.onChange }
                      placeholder={ staticContent.emailAddressPlaceholder }
                      aria-label={ staticContent.emailAddressPlaceholder }
                      data-aid={ dataAids.MEMBERSHIP_REQ_RESET_EMAIL }
                      value={ email }
                    />
                    <WithError state={ this.state } field='email'>
                      { error => (
                        <Error data-aid={ dataAids.MEMBERSHIP_REQ_RESET_ERR_REND }>
                          { staticContent[error] }
                        </Error>
                      ) }
                    </WithError>
                  </Block>
                  <Block style={ styles.formButtonBlock }>
                    <Button.Primary
                      tag='button'
                      type='submit'
                      data-aid={ dataAids.MEMBERSHIP_REQ_RESET_SUBMIT }
                      disabled={ busy }
                      state={ busy ? 'disabled' : undefined } // eslint-disable-line no-undefined
                      style={ styles.marginBottom }
                    >
                      { staticContent.sendResetLink }
                    </Button.Primary>
                  </Block>
                </UX2.Group.Form>
                <Block style={{ textAlign: 'center' }}>
                  <WithError state={ this.state } field='form'>
                    { error => (
                      <Error data-aid={ dataAids.MEMBERSHIP_REQ_RESET_ERR_REND }>
                        { staticContent[error] }
                      </Error>
                    ) }
                  </WithError>
                  { this.state.hasErrors &&
                    Object.keys(this.state.errors).map(k => (
                      <Error key={ k } data-aid={ dataAids.MEMBERSHIP_REQ_RESET_ERR_REND }>
                        { staticContent[this.state.errors[k]] }
                      </Error>
                    )) }
                </Block>
              </React.Fragment>
            ) }
            <Text
              data-aid={ dataAids.MEMBERSHIP_REQ_RESET_CANCEL }
              style={ styles.centeredMarginBottom }
            >
              { staticContent.dontNeedToReset }{ ' ' }
              <Link style={ styles.signInLink } onClick={ onCancel }>
                { staticContent.signInLinkText }
              </Link>
            </Text>
          </Cell>
        </Grid>
      </Block>
    );
  }
}

RequestReset.propTypes = {
  staticContent: object,
  ventureId: string.isRequired,
  onCancel: func.isRequired
};

export default RequestReset;
