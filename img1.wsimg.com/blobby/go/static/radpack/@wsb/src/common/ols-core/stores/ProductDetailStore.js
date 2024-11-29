import { assign } from 'lodash';
import EventEmitter from '@wsb/commerce-event-emitter';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ProductConstants from '../constants/ProductConstants';
import CartConstants from '../constants/CartConstants';
import ApplePayConstants from '../constants/ApplePayConstants';

class ProductDetailStore extends EventEmitter {
  constructor() {
    super(...arguments);

    this.state = {
      fetching: false,
      error: null,
      errorRetryable: false,
      slug: null,
      product: null,
      selectedVariantSku: null,
      paymentRequestButtonClicked: false,
      similarProducts: []
    };
    this.register();
  }

  setState(newState) {
    assign(this.state, newState);
    this.emit('change');
  }

  getState() {
    return this.state;
  }

  register() {
    this.dispatchToken = AppDispatcher.register((payload) => {
      const { action } = payload;

      switch (action.type) {
        case ProductConstants.SET_PRODUCT_DETAIL_DATA:
          this.setState({
            slug: action.data.slug,
            selectedVariantSku: action.data.selectedVariantSku
          });
          break;
        case ProductConstants.SET_PRODUCT_SLUG:
          this.setState({
            slug: action.data
          });
          break;
        case ProductConstants.LOAD_PRODUCT:
          this.setState({
            fetching: true,
            error: null,
            errorRetryable: false,
            similarProducts: []
          });
          break;
        case ProductConstants.PRODUCT_WAS_LOADED:
          this.setState({
            fetching: false,
            product: action.data
          });
          break;
        case ProductConstants.ERROR_LOADING_PRODUCT_DATA:
          this.setState({
            fetching: false,
            error: action.error
          });
          break;
        case ProductConstants.LOAD_SIMILAR_PRODUCTS:
          this.setState({
            error: null,
            errorRetryable: false
          });
          break;
        case ProductConstants.LOAD_SIMILAR_PRODUCTS_LOADED:
          this.setState({
            similarProducts: action.data.products
          });
          break;
        case ProductConstants.ERROR_LOADING_SIMILAR_PRODUCTS_DATA:
          this.setState({
            error: action.error
          });
          break;
        case CartConstants.ERROR_CART_ITEM_ADD:
          this.setState({
            fetching: false,
            error: action.error
          });
          break;
        case ApplePayConstants.SESSION_STARTED:
          this.setState({
            error: null
          });
          break;
        case ApplePayConstants.SESSION_FAILED:
          this.setState({
            error: action.error
          });
          break;
        case ApplePayConstants.PAYMENT_REQUEST_BUTTON_CLICKED:
          this.setState({
            paymentRequestButtonClicked: true
          });
          break;
        default:
          break;
      }
    });
  }
}

export default new ProductDetailStore();
