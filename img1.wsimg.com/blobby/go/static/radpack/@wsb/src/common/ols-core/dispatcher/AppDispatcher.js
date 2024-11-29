import { Dispatcher } from 'flux';
import { PayloadSources } from '../constants/ActionConstants';

const AppDispatcher = new Dispatcher();

export const dispatchViewAction = action => {
  AppDispatcher.dispatch({
    source: PayloadSources.VIEW_ACTION,
    action: action
  });
};

export const dispatchServerAction = action => {
  AppDispatcher.dispatch({
    source: PayloadSources.SERVER_ACTION,
    action: action
  });
};

AppDispatcher.dispatchViewAction = dispatchViewAction;

AppDispatcher.dispatchServerAction = dispatchServerAction;

export default AppDispatcher;
