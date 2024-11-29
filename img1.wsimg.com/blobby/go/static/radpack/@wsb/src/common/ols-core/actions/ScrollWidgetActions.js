import { dispatchViewAction } from '../dispatcher/AppDispatcher';
import ScrollWidgetConstants from '../constants/ScrollWidgetConstants';

function scrollShopWidget() {
  dispatchViewAction({
    type: ScrollWidgetConstants.SCROLL_WIDGET,
    data: 'shop'
  });
  typeof window !== 'undefined' && window.dispatchEvent(new Event('shopScroll'));
}

export default {
  scrollShopWidget
};
