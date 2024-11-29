import React from 'react';
import PropTypes from 'prop-types';
import FormMobile from './form-mobile';
import FormDesktop from './form-desktop';
import DataAid from '../../constants/data-aids';
import { UX2 } from '@wsb/guac-widget-core';

class ContactForm extends React.Component {
  render() {
    if (!this.props.formEnabled) {
      return null;
    }

    const { category, section } = this.props;
    const styles = {
      container: {
        'position': 'relative',
        '@md': {
          position: 'static'
        }
      },
      mobile: {
        'display': 'block',
        '@md': {
          display: 'none'
        }
      },
      desktop: {
        'display': 'none',
        'height': 'inherit',
        '@md': {
          display: 'block'
        }
      }
    };
    return (
      <UX2.Element.Block category={ category } section={ section } style={ styles.container }>
        <UX2.Element.Block data-aid={ DataAid.CONTACT_FORM_CONTAINER_MOBILE } style={ styles.mobile }>
          <FormMobile { ...this.props } />
        </UX2.Element.Block>
        <UX2.Element.Block data-aid={ DataAid.CONTACT_FORM_CONTAINER_DESKTOP } style={ styles.desktop }>
          <FormDesktop { ...this.props } />
        </UX2.Element.Block>
      </UX2.Element.Block>
    );
  }
}

ContactForm.propTypes = {
  formEnabled: PropTypes.bool,
  category: PropTypes.string,
  section: PropTypes.string,
  staticContent: PropTypes.object,
  domainName: PropTypes.string,
  formSubmitHost: PropTypes.string,
  ...FormDesktop.propTypes
};

export default ContactForm;
