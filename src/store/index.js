import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import rootReducer from "./reducers/rootReducers";

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

// Wrap the root reducer with persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
