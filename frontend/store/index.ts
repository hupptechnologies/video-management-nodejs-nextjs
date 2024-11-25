import { combineSlices, configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { authSlice } from './feature/auth/slice';
import { toastSlice } from './feature/toast/slice';
import { videoSlice } from './feature/video/slice';
import { navigationSlice } from './feature/navigation/slice';
import { channelSlice } from './feature/channel/slice';

const rootReducer = combineSlices(authSlice, toastSlice, videoSlice, navigationSlice, channelSlice);

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({
				serializableCheck: false
			});
		}
	});
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
