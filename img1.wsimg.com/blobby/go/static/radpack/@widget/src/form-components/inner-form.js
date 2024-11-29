import PropTypes from 'prop-types';
import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import DataAid from '../constants/dataAids';
import Validations from '../constants/validations-regex';

class InnerForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      input: '',
      isValid: true
    };
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  buildRequestBody() {
    const { accountId, websiteId, locale, inputPlaceholder } = this.props;
    const formData = [
      {
        label: inputPlaceholder,
        value: this.state.input
      }
    ];

    return { accountId, websiteId, locale, formData };
  }

  sendForm(requestBody) {
    const { formSubmitHost } = this.props;
    if (!formSubmitHost) return false;
    var xhr = new window.XMLHttpRequest();
    xhr.open('POST', `${formSubmitHost}/v1/subscriber`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = this.handleSubmitResponse;
    xhr.send(JSON.stringify(requestBody));
    return true;
  }

  validateForm() {
    let isValid = true;
    isValid = Validations.email.regex.test(this.state.input);
    this.setState({ isValid });
    return isValid;
  }

  validateAndSend() {
    if (this.validateForm()) {
      const requestBody = this.buildRequestBody();
      this.sendForm(requestBody);
      this.props.onSubmit();
    }
  }
  onSubmit(e) {
    e.preventDefault();
    this.validateAndSend();
  }

  render() {
    const { input, isValid } = this.state;
    const { inputPlaceholder, subscribeButtonLabel, staticContent = {} } = this.props;
    const { defaultButtonLabel, emailErrorMessage } = staticContent;
    const getTCCLString = UX2.utils.TCCLUtils.getTCCLString;
    const tcclString = getTCCLString({
      eid: 'ux2.gem-subscribe.submit_form.click',
      type: 'click'
    });

    return (
      <UX2.Component.InputGroup
        input={{
          placeholder: inputPlaceholder,
          onChange: this.handleChange,
          value: input
        }}
        button={{
          children: subscribeButtonLabel || defaultButtonLabel,
          ['data-tccl']: tcclString,
          ['data-aid']: DataAid.SUBSCRIBE_SUBMIT_BUTTON_REND
        }}
        error={ !isValid && emailErrorMessage }
        errorProps={{
          ['data-aid']: DataAid.SUBSCRIBE_EMAIL_ERR_REND
        }}
        onSubmit={ this.onSubmit }
      />
    );
  }
}

InnerForm.propTypes = {
  accountId: PropTypes.string,
  websiteId: PropTypes.string,
  formSubmitHost: PropTypes.string,
  category: PropTypes.string,
  formSuccessMessage: PropTypes.string,
  formFields: PropTypes.array,
  formFieldVariationOptions: PropTypes.object,
  onSubmit: PropTypes.func,
  subscribeButtonLabel: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  staticContent: PropTypes.object,
  locale: PropTypes.string.isRequired
};

export default InnerForm;
