import React from 'react';
import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';
import DataAid from '../constants/dataAids';

const styles = {
  verification: {
    wordWrap: 'break-word',
    marginBottom: 'medium'
  }
};

const LoadingWrapper = () => {
  const loaderStyles = {
    marginTop: 'xlarge',
    opacity: '0.5'
  };

  return (
    <UX2.Element.Loader
      data-aid={ DataAid.COUPON_CODE_FETCHING }
      size='medium'
      style={ loaderStyles }
    />
  );
};

class CouponMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      loaded: false
    };

    this.loadCouponData = this.loadCouponData.bind(this);
  }

  componentDidMount() {
    this.loadCouponData();
  }

  loadCouponData() {
    const { olsConfigHost } = this.props;
    if (!olsConfigHost) return;
    const xhr = new XMLHttpRequest();
    const ts = new Date();
    xhr.open('GET', `${olsConfigHost}/api/v3/config?ts=${+ts}`, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', '*/*');
    xhr.onload = () => {
      let data = {};
      let code = null;
      try {
        data = xhr.response ? JSON.parse(xhr.response) : {};
      } catch (ex) {
        data = {};
      }

      if (data.subscribe_coupon) {
        code = data.subscribe_coupon.code;
      }
      this.setState({ code, loaded: true });
    };
    xhr.onerror = () => {
      this.setState({ loaded: true });
    };
    xhr.send();
  }

  render() {
    const { couponDiscount, couponDiscountMessage } = this.props;
    const { code, loaded } = this.state;
    if (!loaded) return <LoadingWrapper />;
    if (!couponDiscount || !code) return null;

    const { Block, Text } = UX2.Element;
    const couponMessage =
      couponDiscountMessage &&
      couponDiscountMessage
        .replace('{coupon_code}', code.toUpperCase())
        .replace('{discount}', couponDiscount);

    return (
      <Block>
        <Text style={ styles.verification } data-aid={ DataAid.COUPON_DESC_REND }>
          { couponMessage }
        </Text>
        <input type='hidden' name='coupon_code' value={ code } data-aid={ DataAid.COUPON_CODE_REND } />
      </Block>
    );
  }
}

CouponMessage.propTypes = {
  olsConfigHost: PropTypes.string.isRequired,
  couponDiscount: PropTypes.number.isRequired,
  couponDiscountMessage: PropTypes.string.isRequired
};

export default CouponMessage;
