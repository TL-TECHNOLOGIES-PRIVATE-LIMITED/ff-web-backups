import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InnerForm from './inner-form';
import DataAid from '../constants/dataAids';
import { UX2 } from '@wsb/guac-widget-core';
import FormSuccessMessage from '../form-components/form-success-message';
import config from '../config';

export default class SubscribeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formSubmitted: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.setState({ formSubmitted: true });
  }

  renderDescriptionSection({ forceCouponDescription = false } = {}) {
    const { description, couponDescription } = this.props;
    const showCoupon = forceCouponDescription || this.shouldShowCoupon();
    const formDescription = showCoupon ? couponDescription : description;

    if (!formDescription) {
      return null;
    }

    return (
      <UX2.Element.Text
        style={{ wordWrap: 'break-word', textAlign: 'center', marginBottom: 'small' }}
        data-aid={ DataAid.FORM_DESC_REND }
        data-route={ showCoupon ? 'couponDescription' : 'description' }
      >
        { formDescription }
      </UX2.Element.Text>
    );
  }

  renderSectionTitle(sectionTitle, isInternalPage, order) {
    if (!sectionTitle) {
      return null;
    }

    return (
      <UX2.Element.Heading.Middle
        data-aid={ DataAid.SECTION_TITLE_REND }
        data-route='sectionTitle'
        isInternalPage={ isInternalPage }
        order={ order }
        style={{ wordWrap: 'break-word', textAlign: 'center' }}
      >
        { sectionTitle }
      </UX2.Element.Heading.Middle>
    );
  }

  getFormSubmitHost() {
    const { env } = this.props;
    const envConfig = (config && config[env]) || {};
    return envConfig.formSubmitHost;
  }

  getOlsConfigHost() {
    const { env, renderMode, websiteId } = this.props;
    const envConfig = (config && config[env]) || {};
    const baseHost = renderMode === 'PUBLISH' ? envConfig.olsPublishedSiteHost : envConfig.olsHost;

    return (baseHost || '').replace('{websiteId}', websiteId);
  }

  shouldShowCoupon() {
    const { hasNonCommercePlan, couponToggleHidden, couponToggle } = this.props;

    return Boolean(!hasNonCommercePlan && !couponToggleHidden && couponToggle);
  }

  render() {
    const {
      category,
      section,
      confirmationMessage,
      staticContent,
      couponConfirmationMessage,
      couponDiscount,
      couponDiscountMessage
    } = this.props;

    const { verificationText } = staticContent;
    if (this.state.formSubmitted) {
      return (
        <UX2.Base category={ category } section={ section }>
          <FormSuccessMessage
            formSuccessMessage={
              this.shouldShowCoupon() ? couponConfirmationMessage : confirmationMessage
            }
            verificationText={ verificationText }
            olsConfigHost={ this.getOlsConfigHost() }
            showCoupon={ this.shouldShowCoupon() }
            couponDiscount={ couponDiscount }
            couponDiscountMessage={ couponDiscountMessage }
          />
        </UX2.Base>
      );
    }

    const Grid = UX2.Component.Grid;

    return (
      <UX2.Base category={ category } section={ section }>
        <Grid bottom={ false } data-aid={ DataAid.SUBSCRIBE_INNER_FORM_REND } inset={ true }>
          <Grid.Cell>
            { this.renderDescriptionSection() }
            <InnerForm
              formSubmitHost={ this.getFormSubmitHost() }
              onSubmit={ this.onSubmit }
              { ...this.props }
            />
          </Grid.Cell>
        </Grid>
      </UX2.Base>
    );
  }
}

SubscribeForm.propTypes = {
  category: PropTypes.string,
  formTitle: PropTypes.string,
  section: PropTypes.string,
  confirmationMessage: PropTypes.string,
  description: PropTypes.string,
  env: PropTypes.string,
  renderMode: PropTypes.string.isRequired,
  websiteId: PropTypes.string.isRequired,
  staticContent: PropTypes.object,
  locale: PropTypes.string,
  hasNonCommercePlan: PropTypes.boolean,
  couponToggleHidden: PropTypes.boolean,
  couponToggle: PropTypes.boolean,
  couponDescription: PropTypes.string,
  couponConfirmationMessage: PropTypes.string,
  couponDiscount: PropTypes.number,
  couponDiscountMessage: PropTypes.string
};
