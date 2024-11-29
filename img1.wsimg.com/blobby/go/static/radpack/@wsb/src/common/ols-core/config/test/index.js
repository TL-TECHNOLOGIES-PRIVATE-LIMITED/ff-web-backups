export default {
  olsHost: 'https://{websiteId}.onlinestore.test-godaddy.com',
  olsPublishedSiteHost: 'https://{websiteId}.mysimplestore.test-godaddy.com',
  olsAccountStatusHost: 'https://onlinestore.test-godaddy.com',
  reseller: {
    olsHost: 'https://{websiteId}.onlinestore.test-secureserver.net',
    olsPublishedSiteHost: 'https://{websiteId}.test-mysimplestore.com',
    olsAccountStatusHost: 'https://onlinestore.test-secureserver.net'
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
