import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DataAid from '../constants/dataAids';
import { UX2 } from '@wsb/guac-widget-core';
import CouponMessage from './coupon-message';

const styles = {
  container: {
    'textAlign': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'marginHorizontal': 'auto',
    'maxWidth': '90%',
    '@md': {
      maxWidth: '80%'
    }
  },
  verification: {
    wordWrap: 'break-word',
    marginBottom: 'medium'
  },
  success: {
    wordWrap: 'break-word',
    marginBottom: 'medium'
  }
};

export const SuccessMessage = ({ enable, message }) => {
  if (!enable) {
    return null;
  }

  const componentProps = {
    'style': styles.success,
    'tag': 'p',
    'data-aid': DataAid.CONFIRM_TEXT_REND,
    'data-route': 'confirmationMessage'
  };

  return <UX2.Element.Text.Major { ...componentProps }>{ message }</UX2.Element.Text.Major>;
};

SuccessMessage.propTypes = {
  enable: PropTypes.bool,
  message: PropTypes.string
};

export const VerificationText = ({ enable, text }) => {
  if (!enable) {
    return null;
  }

  return (
    <UX2.Element.Text style={ styles.verification } data-aid={ DataAid.CONFIRM_DESC_REND }>
      { text }
    </UX2.Element.Text>
  );
};

VerificationText.propTypes = {
  enable: PropTypes.bool,
  text: PropTypes.string
};

export default class FormSuccessMessage extends PureComponent {
  render() {
    const {
      formSuccessMessage,
      verificationText,
      showCoupon,
      olsConfigHost,
      couponDiscount,
      couponDiscountMessage
    } = this.props;
    return (
      <UX2.Group.Group style={ styles.container }>
        <SuccessMessage enable={ !!formSuccessMessage } message={ formSuccessMessage } />
        <VerificationText enable={ !showCoupon } text={ verificationText } />
        { showCoupon ? (
          <CouponMessage
            olsConfigHost={ olsConfigHost }
            couponDiscount={ couponDiscount }
            couponDiscountMessage={ couponDiscountMessage }
          />
        ) : null }
      </UX2.Group.Group>
    );
  }
}

FormSuccessMessage.propTypes = {
  formSuccessMessage: PropTypes.string,
  category: PropTypes.string,
  verificationText: PropTypes.string,
  showCoupon: PropTypes.bool,
  olsConfigHost: PropTypes.string,
  couponDiscount: PropTypes.number,
  couponDiscountMessage: PropTypes.string
};

FormSuccessMessage.defaultProps = {
  formSuccessMessage: '',
  category: '',
  verificationText: '',
  showCoupon: false,
  olsConfigHost: '',
  couponDiscount: 0
};
