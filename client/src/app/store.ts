import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/gallery/orderSlice';
import galleryReducer from '../features/gallery/gallerySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    gallery: galleryReducer,
    order: orderReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
