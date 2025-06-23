import { configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer } from "@/redux/features/user/userSlice";
import { reducer as alertReducer } from "@/redux/features/alert/alertSlice";
import { reducer as authReducer } from "@/redux/features/authentication/authSlice";
import { reducer as connectionRequestReducer } from "@/redux/features/connectionRequest/connectionRequestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    alert: alertReducer,
    connectionRequest: connectionRequestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
