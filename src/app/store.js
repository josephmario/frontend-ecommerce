import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userDataPersistConfig = {
  key: 'login',
  storage: storage,
};

// const receiveDataPersis = {
//     key: 'receive_data',
//     storage: storage,
// };

export default configureStore({
    reducer: {
        user: persistReducer(userDataPersistConfig, userReducer),
      
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"]
            }
        })
    },
);
