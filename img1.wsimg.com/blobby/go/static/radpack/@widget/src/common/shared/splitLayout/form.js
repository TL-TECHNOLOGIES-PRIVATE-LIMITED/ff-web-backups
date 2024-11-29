import React from 'react';
import PropTypes from 'prop-types';
import InnerForm from '@wsb/guac-widget-shared/lib/components/Form';
import DataAid from '../../../common/constants/data-aids';
import { UX2 } from '@wsb/guac-widget-core';
import Field from '../../../common/constants/editable-field-tags';
import { FORM_PIVOT } from '../../constants/routes';
import closestPolyfill from '../../utils/closestPolyfill';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFormRevealed: false };
    this.isMobile = null;
    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  fixWidgetDynamicHeight(formReference, splitParentContainer) {
    const { isFormRevealed } = this.state;
    const expandedFormHeight = formReference.clientHeight;
    const formHeight = isFormRevealed ? `${expandedFormHeight}px` : 'inherit';
    splitParentContainer.style.height = formHeight;
    formReference.style.maxHeight = formHeight;
  }

  toggleFormVisibility(e) {
    e && e.preventDefault();
    const formToggleState = !this.state.isFormRevealed;
    this.setState({ isFormRevealed: formToggleState });

    const { formId, formContainerId, enableFullScreenForm, gridLayout, hasImage, onFormToggle } =
      this.props;
    onFormToggle && onFormToggle(formToggleState);

    const formReference = document.getElementById(formId);
    const splitParentContainer = document.getElementById(formContainerId);
    if (!formReference || !splitParentContainer || this.isMobile) return;
    const formDisplayStyles =
      (enableFullScreenForm && !this.state.isFormRevealed) || !hasImage
        ? {
          flexBasis: '100%'
        }
        : {
          flexBasis: gridLayout ? '50%' : 'auto'
        };

    if (gridLayout) {
      closestPolyfill();
      const gridCellParent = formReference.closest('[data-ux="GridCell"]');
      Object.keys(formDisplayStyles).forEach(key => {
        gridCellParent.style[key] = formDisplayStyles[key];
      });
    } else {
      Object.keys(formDisplayStyles).forEach(key => {
        splitParentContainer.style[key] = formDisplayStyles[key];
      });
    }
    setTimeout(() => this.fixWidgetDynamicHeight(formReference, splitParentContainer), 500);
  }

  renderInnerForm(useColumnLayout, style = {}) {
    const { formTitle } = this.props;
    const option = {
      EMAIL_OPT_IN: {
        styleOverrides: {
          justifyContent: 'left'
        }
      }
    };

    const titleElement = (
      <UX2.Element.Heading.Minor
        style={{ marginBottom: 'medium', ...style.formTitle }}
        data-aid={ DataAid.CONTACT_FORM_TITLE_REND }
        data-route={ Field.FORM_TITLE }
        children={ formTitle }
      />
    );

    return (
      <InnerForm
        title={ titleElement }
        formFieldVariationOptions={ option }
        useColumnLayout={ useColumnLayout }
        onFormClose={ this.toggleFormVisibility }
        dataAidPrefix='CONTACT'
        { ...this.props }
      />
    );
  }

  renderExpandBtn({ isMobile = false } = {}) {
    const { formTitle } = this.props;
    if (this.isMobile === null) {
      this.isMobile = isMobile;
    }
    return (
      <UX2.Element.Button.Primary
        tag='button'
        style={{ marginTop: 'medium' }}
        onClick={ this.toggleFormVisibility }
        data-aid={ DataAid.CONTACT_FORM_REVEAL_BUTTON_REND }
        data-route={ Field.FORM_TITLE }
        data-field-route={ FORM_PIVOT }
        children={ formTitle }
      />
    );
  }

  render() {
    return null;
  }
}

Form.propTypes = {
  formTitle: PropTypes.string,
  formId: PropTypes.string,
  formContainerId: PropTypes.string,
  enableFullScreenForm: PropTypes.bool,
  hasImage: PropTypes.bool,
  onFormToggle: PropTypes.func,
  gridLayout: PropTypes.bool,
  ...InnerForm.propTypes
};

export default Form;
