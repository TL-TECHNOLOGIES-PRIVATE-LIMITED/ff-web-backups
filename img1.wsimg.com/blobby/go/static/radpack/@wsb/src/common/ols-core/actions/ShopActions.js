import { dispatchViewAction } from '../dispatcher/AppDispatcher';
import ShopConstants from '../constants/ShopConstants';

function setView(view) {
  dispatchViewAction({
    type: ShopConstants.SET_VIEW,
    data: view
  });
}

export default { setView };
