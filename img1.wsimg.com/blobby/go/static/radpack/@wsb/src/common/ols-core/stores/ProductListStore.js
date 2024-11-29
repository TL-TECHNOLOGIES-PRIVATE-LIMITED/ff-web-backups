import { assign } from 'lodash';
import EventEmitter from '@wsb/commerce-event-emitter';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ProductConstants from '../constants/ProductConstants';

class ProductListStore extends EventEmitter {
  constructor() {
    super(...arguments);

    this.state = {
      fetching: false,
      fetched: false,
      error: null,
      errorRetryable: false,
      count: 0,
      totalCount: 0,
      currentPage: 0,
      perPage: 12,
      pages: 0,
      searchKeywords: null,
      sortOption: null,
      defaultPerPage: 12,
      defaultSortOption: null,
      products: [],
      pagination: {}
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
        case ProductConstants.LOAD_PRODUCTS:
          this.setState({
            fetching: true,
            error: null,
            errorRetryable: false,
            searchKeywords: data.searchKeywords,
            sortOption: data.sortOption
          });
          break;
        case ProductConstants.PRODUCTS_WERE_LOADED:
          this.setState({
            fetching: false,
            fetched: true,
            count: data.count,
            totalCount: data.total_count,
            currentPage: data.current_page,
            perPage: data.per_page,
            pagination: data.pagination,
            pages: data.pages,
            products: data.products
          });
          break;
        case ProductConstants.ERROR_LOADING_PRODUCTS_DATA:
          this.setState({
            fetching: false,
            fetched: true,
            error: action.error
          });
          break;
        case ProductConstants.SET_PRODUCT_CONFIG:
          this.setState({
            defaultPerPage: data.defaultPerPage,
            perPage: data.defaultPerPage,
            defaultSortOption: data.defaultSortOption
          });
          break;
        default:
          break;
      }
    });
  }
}

export default new ProductListStore();
