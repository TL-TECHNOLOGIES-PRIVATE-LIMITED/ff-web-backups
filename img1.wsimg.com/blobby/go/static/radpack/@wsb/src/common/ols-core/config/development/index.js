export default {
  olsHost: 'https://{websiteId}.onlinestore.dev-godaddy.com',
  olsPublishedSiteHost: 'https://{websiteId}.dev-mysimplestore.com',
  olsAccountStatusHost: 'https://onlinestore.dev-godaddy.com',
  reseller: {
    olsHost: 'https://{websiteId}.onlinestore.dev-secureserver.net',
    olsPublishedSiteHost: 'https://{websiteId}.dev-mysimplestore.com',
    olsAccountStatusHost: 'https://onlinestore.dev-secureserver.net'
  },
  noProductImage: '//onlinestore.wsimg.com/assets/themes/__master/assets/images/prod_no_image_padded.png',
  requestRetries: 2,
  requestTimeout: {
    default: 30000,
    addToCart: 15000,
    loadProducts: 10000,
    loadProduct: 25000,
    loadSimilarProducts: 10000
  }
};
