import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as appReducer } from "./appReducer/reducer";
const rootreducer = combineReducers({ authReducer, appReducer });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  rootreducer,
  composeEnhancers(applyMiddleware(thunk))
);

export { store };
