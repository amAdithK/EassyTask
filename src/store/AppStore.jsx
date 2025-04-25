import { createContext, useContext } from "react";
import { INITIAL_APP_STORE_STATE } from "./config.js";

/**
 * Instance of React Context to use as global AppStore
 */
export const AppStoreContext = createContext([
  INITIAL_APP_STORE_STATE,
  () => null,
]);

/**
 * Hook to use the AppStore in functional components
 *
 * import {useAppStore} from './store'
 * ...
 * const [state, dispatch] = useAppStore();
 */
export const useAppStore = () => useContext(AppStoreContext);

/**
 * HOC to inject the AppStore to class component, also works for functional components
 *
 * import {withAppStore} from './store'
 * ...
 * class MyComponent
 * ...
 * export default withAppStore(MyComponent)
 */
export const withAppStore = (Component) => {
  return (props) => {
    return <Component {...props} store={useAppStore()} />;
  };
};
