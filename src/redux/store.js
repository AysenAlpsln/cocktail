import { configureStore } from "@reduxjs/toolkit";

import cocktailsSlice from "./cocktailsSlice";

export const store = configureStore({
  reducer: {
    cocktails: cocktailsSlice,
  },
});