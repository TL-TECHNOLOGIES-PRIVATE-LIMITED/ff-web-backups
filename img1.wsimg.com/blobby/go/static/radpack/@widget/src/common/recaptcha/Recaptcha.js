import React from 'react';
import createClient from '../../connections/client';
import { loadScript } from './utils';

const baseUrl = '/m/api/crm';
const timeout = 30000;
const { error } = console;

class Recaptcha extends React.Component {
  componentDidMount() {
    this.execute = () => Promise.resolve();
    this.loadSiteKey().then(this.loadRecaptcha);
  }

  loadSiteKey = () => {
    return createClient({ baseUrl, timeout })
      .getSettings()
      .then(data => data.recaptchaSiteKey)
      .catch(err => error('Failure getting Recaptcha site key: ', err));
  };

  loadRecaptcha = siteKey => {
    loadScript({ siteKey }, () => {
      this.execute = () => window.grecaptcha.execute(siteKey, { action: 'formSubmit' });
    });
  };

  render() {
    return null;
  }
}

export default Recaptcha;
