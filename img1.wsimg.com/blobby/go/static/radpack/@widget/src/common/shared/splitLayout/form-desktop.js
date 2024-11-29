import React from 'react';
import PropTypes from 'prop-types';
import Form from './form';
import DataAid from '../../constants/data-aids';
import { UX2, constants } from '@wsb/guac-widget-core';
import { calculateTotalFieldsWeight, getFieldsBalancingInfo } from '../../utils/helper';

const { Z_INDEX_CONTENT } = constants.layers;

class FormDesktop extends Form {
  render() {
    const { formId, category, formFields } = this.props;
    const { useSecondColumn, numberOfFieldsOnLeftSide } = getFieldsBalancingInfo(formFields);
    const leftFieldsWeight = calculateTotalFieldsWeight(
      formFields.slice(0, numberOfFieldsOnLeftSide)
    );

    const styles = {
      form: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: Z_INDEX_CONTENT + 1,
        paddingVertical: leftFieldsWeight > 4 ? 'xxlarge' : 'xxxlarge',
        transform: this.state.isFormRevealed ? 'translate3d(0,0,0)' : 'translate3d(-120%,0,0)',
        opacity: this.state.isFormRevealed ? 1 : 0,
        transition: 'transform .8s ease, opacity .1s',
        width: '100%',
        backgroundColor: 'section',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflowY: 'auto'
      },
      container: {
        width: '100%',
        backgroundColor: 'section',
        paddingHorizontal: 'medium',
        paddingBottom: 'medium',
        maxWidth: useSecondColumn ? '1200px' : '600px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    };

    return (
      <div>
        <UX2.Element.Block
          id={ formId }
          data-aid={ DataAid.CONTACT_FORM_CONTAINER_REND }
          style={ styles.form }
          category={ category }
        >
          <UX2.Element.Block style={ styles.container } category={ category }>
            { this.renderInnerForm(true) }
          </UX2.Element.Block>
        </UX2.Element.Block>
        { !this.state.isFormRevealed ? (
          <UX2.Element.Block>{ this.renderExpandBtn() }</UX2.Element.Block>
        ) : null }
      </div>
    );
  }
}

FormDesktop.propTypes = {
  formId: PropTypes.string,
  category: PropTypes.string,
  formFields: PropTypes.array
};

export default FormDesktop;
