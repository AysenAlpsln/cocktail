import { configureStore } from "@reduxjs/toolkit";

import cocktailsSlice from "./cocktailsSlice";
import detailSlice from "./detailSlice";

export const store = configureStore({
  reducer: {
    cocktails: cocktailsSlice,
    details: detailSlice
  },
});