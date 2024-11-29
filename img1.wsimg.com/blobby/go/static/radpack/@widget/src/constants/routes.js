import { Maniless } from '@wsb/guac-widget-core';

const {
  constants: { routes }
} = Maniless;

export default {
  ...routes,
  FORM_PIVOT: '/form',
  FORM_FIELD: '/form/$'
};
