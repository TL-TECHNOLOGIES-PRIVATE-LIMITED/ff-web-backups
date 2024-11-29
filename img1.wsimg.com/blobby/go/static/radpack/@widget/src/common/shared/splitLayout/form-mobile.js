import React from 'react';
import Form from './form';
import DataAid from '../../constants/data-aids';
import { UX2 } from '@wsb/guac-widget-core';

class FormMobile extends Form {
  render() {
    return this.state.isFormRevealed ? (
      <UX2.Element.Block
        data-aid={ DataAid.CONTACT_FORM_CONTAINER_MOBILE_REND }
        style={{ marginTop: 'xlarge' }}
      >
        { this.renderInnerForm(false, {
          formTitle: { marginLeft: 'medium', marginRight: 'medium' }
        }) }
      </UX2.Element.Block>
    ) : (
      this.renderExpandBtn({ isMobile: true })
    );
  }
}

export default FormMobile;
