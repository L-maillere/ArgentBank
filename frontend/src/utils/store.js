import { configureStore } from '@reduxjs/toolkit';
import authentificationReducer from '../features/authentification/authentification';

const store = configureStore({
    reducer: {
        authentification: authentificationReducer,
    }
});

export default store;