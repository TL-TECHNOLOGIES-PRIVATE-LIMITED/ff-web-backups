import { assign } from 'lodash';
import EventEmitter from '@wsb/commerce-event-emitter';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CategoryConstants from '../constants/CategoryConstants';
import ProductConstants from '../constants/ProductConstants';
import OlsConfigConstants from '../constants/OlsConfigConstants';

const findTaxonTree = (searchPermalink = '', taxons = []) => {
  for (const taxon of taxons) {
    const { permalink, name } = taxon;
    const entry = { permalink, name };

    if (taxon?.permalink === searchPermalink) {
      return [entry];
    }

    const results = findTaxonTree(searchPermalink, taxon?.taxons);
    if (results?.length) {
      return [entry, ...results];
    }
  }

  return [];
};

class CategoryListStore extends EventEmitter {
  constructor() {
    super(...arguments);
    this.buildTaxonMap = this.buildTaxonMap.bind(this);

    this.state = {
      fetching: false,
      fetched: false,
      error: null,
      errorRetryable: false,
      count: 0,
      totalCount: 0,
      currentPage: 0,
      perPage: 10000, // High number to avoid pagination of top level taxons
      pages: 0,
      taxons: [],
      fetchTaxons: false,
      taxonMap: {}
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

  /* Needed to support stores published before NEMO-11100 */
  getTaxonName(permalink) {
    const { taxonMap } = this.state;

    return taxonMap[permalink].name;
  }

  getTaxonInfo(permalink) {
    const { taxonMap } = this.state;
    const { name, description, image } = taxonMap[permalink] || {};

    return {
      name,
      description,
      image
    };
  }

  buildTaxonMap(taxons, map = {}) {
    taxons.forEach((taxon) => {

      const taxonImage = taxon.cover_image && taxon.cover_image.length ? taxon.cover_image[0].large_url : '';
      const taxonInfo = { name: taxon.name };

      if (taxon.description) taxonInfo.description = taxon.description;
      if (taxonImage) taxonInfo.image = taxonImage;

      map[taxon.permalink] = taxonInfo;

      if (taxon.taxons && taxon.taxons.length > 0) {
        this.buildTaxonMap(taxon.taxons, map);
      }
    });

    return map;
  }

  getTaxonListByPermalink(permalink) {
    return findTaxonTree(permalink, this.state?.taxons);
  }

  register() {
    this.dispatchToken = AppDispatcher.register((payload) => {
      const { action } = payload;
      const { data } = action;

      switch (action.type) {
        case CategoryConstants.LOAD_CATEGORIES:
          this.setState({
            fetching: true,
            error: null,
            errorRetryable: false
          });
          break;
        case CategoryConstants.CATEGORIES_WERE_LOADED:
          this.setState({
            fetching: false,
            fetched: true,
            count: data.count,
            totalCount: data.total_count,
            currentPage: data.current_page,
            perPage: data.per_page,
            pages: data.pages,
            taxons: data.taxons,
            fetchTaxons: false,
            taxonMap: this.buildTaxonMap(data.taxons)
          });
          break;
        case CategoryConstants.ERROR_LOADING_CATEGORIES_DATA:
          this.setState({
            fetching: false,
            fetched: true,
            error: action.error
          });
          break;
        case ProductConstants.LOAD_PRODUCTS:
          this.setState({
            fetchTaxons: data.fetchTaxons
          });
          break;
        case OlsConfigConstants.CONFIG_WAS_LOADED:
          this.setState({
            fetchTaxons: true
          });
          break;
        default:
          break;
      }
    });
  }
}

export default new CategoryListStore();
