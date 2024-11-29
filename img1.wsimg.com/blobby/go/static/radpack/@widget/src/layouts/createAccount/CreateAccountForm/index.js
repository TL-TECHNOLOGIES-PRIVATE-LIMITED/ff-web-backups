import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { UX2 } from '@wsb/guac-widget-core';
import createClient from '../../../connections/client';
import Recaptcha from '../../../common/recaptcha/Recaptcha';
import RecaptchaTerms from '../../../common/recaptcha/Terms';
import dataAids from '../../../common/dataAids';
import { validateWithChanges, WithError, addError, clearErrors } from '../../../common/validation';
import Styles from '../../../common/StackedFormStyles';
import Success from './Success';
import { validate } from './validation';

const styles = new Styles();

const NOT_ASKED = 'NOT_ASKED';
const OPTED_IN = 'OPTED_IN';
const OPTED_OUT = 'OPTED_OUT';
const CREATE_ACCOUNT_TIMEOUT = 30000;

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.createContactRequest = this.createContactRequest.bind(this);
    this.formIsValid = this.formIsValid.bind(this);

    const {
      privacy: { requiresMarketingConsent },
      membership: { recaptchaEnabled }
    } = props.featureFlags;

    this.state = {
      email: '',
      nameFirst: '',
      nameLast: '',
      phone: '',
      isSubmitted: false,
      requestFailed: false,
      successful: false,
      emailMarketingOptedIn: false,
      showEmailMarketingConsent: requiresMarketingConsent,
      errors: {}
    };

    if (recaptchaEnabled) {
      this.recaptcha = React.createRef();
    }
  }

  get emailMarketingConsent() {
    const { showEmailMarketingConsent, emailMarketingOptedIn } = this.state;
    if (!showEmailMarketingConsent) return NOT_ASKED;

    return emailMarketingOptedIn ? OPTED_IN : OPTED_OUT;
  }

  onSubmit(e) {
    this.setState(clearErrors);
    e.preventDefault();

    if (!this.formIsValid()) {
      return;
    }

    const { nameFirst, nameLast, email, phone } = this.state;
    const hasPhone = !isEmpty(phone);

    const contact = {
      nameFirst,
      nameLast,
      email,
      emailMarketingConsent: this.emailMarketingConsent
    };

    if (hasPhone) {
      contact.phones = [{ phoneNumber: phone }];
    }

    this.setState({ busy: true });
    this.createContactRequest(contact);
  }

  formIsValid() {
    const validatedState = validateWithChanges(validate)(this.state);
    const { hasErrors } = validatedState;

    if (hasErrors) {
      this.setState(validatedState);
    }

    return !hasErrors;
  }

  createContactRequest(contact) {
    const { ventureId } = this.props;
    const {
      membership: { recaptchaEnabled }
    } = this.props.featureFlags;

    const recaptcha = recaptchaEnabled ? this.recaptcha.current.execute() : Promise.resolve();

    return recaptcha
      .then(recaptchaToken => {
        const client = createClient({
          baseUrl: '/m/api/crm',
          timeout: CREATE_ACCOUNT_TIMEOUT
        });
        return client
          .batchCreateActivities({
            ventureId,
            contact,
            recaptchaToken,
            activities: [{ type: 'MEMBERSHIP_REQUESTED' }],
            source: 'WEBSITE_BUILDER',
            beacon: this.state.beacon
          })
          .then(() => this.setState({ successful: true }));
      })
      .catch(() => {
        this.setState({ busy: false });
        this.setState(addError('form', 'createAccountError'));
      });
  }

  onChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onCheckboxChange({ target }) {
    const { name, checked } = target;
    this.setState({ [name]: checked });
  }

  render() {
    const {
      staticContent,
      featureFlags: {
        membership: { recaptchaEnabled }
      }
    } = this.props;
    const { Heading, Container, Block, Text, Input, Button, Link, Error } = UX2.Element;
    const {
      nameFirst,
      nameLast,
      email,
      phone,
      busy,
      successful,
      emailMarketingOptedIn,
      showEmailMarketingConsent
    } = this.state;
    const {
      Grid,
      Grid: { Cell }
    } = UX2.Component;

    return (
      <Container>
        { successful ? (
          <Success email={ email } staticContent={ staticContent } />
        ) : (
          <React.Fragment>
            <Heading data-aid={ dataAids.CREATE_ACCOUNT_HEADING_REND }>
              { staticContent.createAccount }
            </Heading>
            <Grid inset='true'>
              <Cell>
                { !showEmailMarketingConsent && (
                  <Block style={ styles.centeredMarginBottom }>
                    <Text data-aid={ dataAids.CREATE_ACCOUNT_DESCRIPTION_REND }>
                      { staticContent.createAccountDescription }
                    </Text>
                  </Block>
                ) }
                <UX2.Group.Form
                  tag='form'
                  onSubmit={ this.onSubmit }
                  action='/m/reset'
                  method='post'
                  data-aid={ dataAids.CREATE_ACCOUNT_FORM_REND }
                >
                  <Block style={ styles.marginBottom }>
                    <Input
                      tag='input'
                      type='text'
                      name='nameFirst'
                      onChange={ this.onChange }
                      placeholder={ staticContent.firstNamePlaceholder }
                      data-aid={ dataAids.CREATE_ACCOUNT_NAME_FIRST }
                      value={ nameFirst }
                    />
                    <WithError state={ this.state } field='nameFirst'>
                      { error => (
                        <Error data-aid={ dataAids.CREATE_ACCOUNT_NAME_FIRST_ERR }>
                          { staticContent[error] }
                        </Error>
                      ) }
                    </WithError>
                  </Block>
                  <Block style={ styles.marginBottom }>
                    <Input
                      tag='input'
                      type='text'
                      name='nameLast'
                      onChange={ this.onChange }
                      placeholder={ staticContent.lastNamePlaceholder }
                      data-aid={ dataAids.CREATE_ACCOUNT_NAME_LAST }
                      value={ nameLast }
                    />
                    <WithError state={ this.state } field='nameLast'>
                      { error => (
                        <Error data-aid={ dataAids.CREATE_ACCOUNT_NAME_LAST_ERR }>
                          { staticContent[error] }
                        </Error>
                      ) }
                    </WithError>
                  </Block>
                  <Block style={ styles.marginBottom }>
                    <Input
                      tag='input'
                      type='text'
                      name='email'
                      onChange={ this.onChange }
                      placeholder={ staticContent.emailPlaceholder }
                      data-aid={ dataAids.CREATE_ACCOUNT_EMAIL }
                      value={ email }
                    />
                    <WithError state={ this.state } field='email'>
                      { error => (
                        <Error data-aid={ dataAids.CREATE_ACCOUNT_EMAIL_ERR }>
                          { staticContent[error] }
                        </Error>
                      ) }
                    </WithError>
                  </Block>
                  <Block style={ styles.marginBottom }>
                    <Input
                      tag='input'
                      type='text'
                      name='phone'
                      onChange={ this.onChange }
                      placeholder={ staticContent.phonePlaceholder }
                      data-aid={ dataAids.CREATE_ACCOUNT_PHONE }
                      value={ phone }
                    />
                    <WithError state={ this.state } field='phone'>
                      { error => (
                        <Error data-aid={ dataAids.CREATE_ACCOUNT_PHONE_ERR }>
                          { staticContent[error] }
                        </Error>
                      ) }
                    </WithError>
                  </Block>
                  <Block style={ styles.honeypotContainer }>
                    <Input
                      type='text'
                      autoComplete='off'
                      name='beacon'
                      style={ styles.honeypotTextField }
                      data-aid={ dataAids.CREATE_ACCOUNT_BEACON }
                      onChange={ this.onChange }
                    />
                  </Block>
                  { showEmailMarketingConsent && (
                    <Block style={ styles.marginBottom }>
                      <Input.Checkbox
                        name='emailMarketingOptedIn'
                        label={ staticContent.createAccountMarketingConsent }
                        onChange={ this.onCheckboxChange }
                        data-aid={ dataAids.CREATE_ACCOUNT_MARKETING_CHECKBOX }
                        checked={ emailMarketingOptedIn }
                      />
                    </Block>
                  ) }
                  <Block style={ styles.formButtonBlock }>
                    <Button.Primary
                      style={ styles.marginBottom }
                      state={ busy ? 'disabled' : undefined } // eslint-disable-line no-undefined
                    >
                      { staticContent.createAccount }
                    </Button.Primary>
                  </Block>
                  <Block style={ styles.centeredMarginBottom }>
                    <Text>
                      { staticContent.alreadyHaveAccount }{ ' ' }
                      <Link href='/m/login'>{ staticContent.signIn }</Link>
                    </Text>
                  </Block>
                  <Block>
                    <WithError state={ this.state } field='form'>
                      { error => (
                        <Error data-aid={ dataAids.CREATE_ACCOUNT_FORM_ERR }>
                          { staticContent[error] }
                        </Error>
                      ) }
                    </WithError>
                  </Block>
                  <Block>
                    { recaptchaEnabled && (
                      <React.Fragment>
                        <Recaptcha ref={ this.recaptcha } />
                        <RecaptchaTerms staticContent={ staticContent } />
                      </React.Fragment>
                    ) }
                  </Block>
                </UX2.Group.Form>
              </Cell>
            </Grid>
          </React.Fragment>
        ) }
      </Container>
    );
  }
}

CreateAccount.propTypes = {
  staticContent: PropTypes.object,
  ventureId: PropTypes.string,
  featureFlags: PropTypes.any
};

export default CreateAccount;
