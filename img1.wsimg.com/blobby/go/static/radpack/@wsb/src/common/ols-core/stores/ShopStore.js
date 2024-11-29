import { assign } from 'lodash';
import EventEmitter from '@wsb/commerce-event-emitter';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ShopConstants from '../constants/ShopConstants';
import ProductConstants from '../constants/ProductConstants';
import CategoryConstants from '../constants/CategoryConstants';
import ShopView from '../constants/ShopView';

class ShopStore extends EventEmitter {
  constructor() {
    super(...arguments);

    this.state = {
      currentView: ShopView.PRODUCT_LISTING,
      taxonsWereLoaded: false,
      selectedTaxonPermalink: null,
      searchKeywords: null,
      routePath: null,
      sortOption: null
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
      const { data } = action;

      switch (action.type) {
        case ShopConstants.SET_VIEW:
          this.setState({
            currentView: data
          });
          break;
        case ProductConstants.SET_PRODUCT_DETAIL_DATA:
        case ProductConstants.SET_PRODUCT_SLUG:
          this.setState({
            currentView: ShopView.PRODUCT_DETAIL
          });
          break;
        case ProductConstants.LOAD_PRODUCTS:
          this.setState({
            currentView: data.searchKeywords ? ShopView.SEARCH_RESULTS : ShopView.PRODUCT_LISTING,
            selectedTaxonPermalink: data.selectedTaxonPermalink,
            searchKeywords: data.searchKeywords,
            sortOption: data.sortOption,
            routePath: data.routePath
          });
          break;
        case CategoryConstants.CATEGORIES_WERE_LOADED:
          setTimeout(() => { // Force setting taxons in CategoryListStore before setting taxonsWereLoaded
            this.setState({
              taxonsWereLoaded: true
            });
          }, 0);
          break;
        default:
          break;
      }
    });
  }
}

export default new ShopStore();
