 
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

import cartReducer from "../features/cart/cartSlice";

// Explicit storage adapter for Redux Persist.
const createStorage = () => ({
  getItem(key) {
    return Promise.resolve(window.localStorage.getItem(key));
  },

  setItem(key, value) {
    window.localStorage.setItem(key, value);
    return Promise.resolve(value);
  },

  removeItem(key) {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
});

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistConfig = {
  key: "tart-co",
  version: 1,
  storage: createStorage(),
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);
