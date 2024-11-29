import { find, assign } from 'lodash';
import EventEmitter from '@wsb/commerce-event-emitter';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CartConstants from '../constants/CartConstants';
import ApplePayConstants from '../constants/ApplePayConstants';

function updateLineItemQuantity(cart, updatedLineItemAttributes) {
  updatedLineItemAttributes.forEach((updatedLineItem) => {
    const cartLineItem = find(cart.line_items, (sli) => {
      return sli.id === +updatedLineItem.id;
    });
    if (cartLineItem) {
      cartLineItem.quantity = updatedLineItem.quantity;
    }
  });
  return cart;
}

class CartStore extends EventEmitter {
  constructor() {
    super(...arguments);

    this.state = {
      fetching: false,
      processing: false,
      error: null,
      errorRetryable: false,
      order: null,
      cart: null,
      validCoupon: null
    };
    this.register();
  }

  setState(newState) {
    assign(this.state, newState);
    this.emit('change');
  }

  getOrder() {
    const { order } = this.state;
    return order;
  }

  isProcessing() {
    const { processing } = this.state;
    return processing;
  }

  getCart() {
    const { cart } = this.state;
    return cart;
  }

  getState() {
    return this.state;
  }

  register() {
    this.dispatchToken = AppDispatcher.register((payload) => {
      const { action } = payload;
      const { data } = action;

      const itemModifyState = {
        fetching: false,
        processing: true,
        error: null,
        errorRetryable: false
      };

      switch (action.type) {
        case CartConstants.CART_LOAD:
        case CartConstants.CART_CREATE:
          this.setState({
            fetching: true,
            error: null,
            errorRetryable: false
          });
          break;
        case CartConstants.CART_WAS_LOADED:
          this.setState({
            fetching: false,
            cart: data,
            order: {
              number: data.number,
              token: data.token
            }
          });
          break;
        case CartConstants.NO_CART_WAS_LOADED:
          this.setState({
            fetching: false,
            cart: null,
            order: null
          });
          break;
        case CartConstants.CART_ITEM_MODIFY:
          this.setState({
            ...itemModifyState,
            cart: updateLineItemQuantity(this.state.cart, data)
          });
          break;
        case CartConstants.CART_ITEM_ADD:
        case CartConstants.CART_ITEM_REMOVE:
          this.setState(itemModifyState);
          break;
        case CartConstants.CART_ITEM_WAS_ADDED:
        case CartConstants.ERROR_CART_ITEM_ADD:
        case CartConstants.CART_ITEM_WAS_MODIFIED:
        case CartConstants.CART_ITEM_WAS_REMOVED:
          this.setState({
            fetching: false,
            processing: false
          });
          break;
        case CartConstants.ERROR_CART_ITEM_REMOVE:
        case CartConstants.ERROR_CART_ITEM_MODIFY:
          this.setState({
            fetching: false,
            processing: false,
            error: action.error
          });
          break;
        case CartConstants.APPLY_COUPON:
          this.setState({
            fetching: true,
            validCoupon: null
          });
          break;
        case CartConstants.COUPON_WAS_APPLIED:
          this.setState({
            fetching: false,
            validCoupon: true,
            cart: data
          });
          break;
        case CartConstants.COUPON_WAS_INVALID:
          this.setState({
            fetching: false,
            validCoupon: false,
            cart: data.response
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
        default:
          break;
      }
    });
  }
}

export default new CartStore();
