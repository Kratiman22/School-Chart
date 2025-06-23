import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {user: userSlice.reducer}
});

store.subscribe(() => {
    localStorage.setItem('users', JSON.stringify(store.getState().user));
});

export default store;
