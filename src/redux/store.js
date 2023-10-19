import { configureStore } from "@reduxjs/toolkit";

import cocktailsSlice from "./cocktailsSlice";
import detailSlice from "./detailSlice";
import searchSlice from "./searchSlice";

export const store = configureStore({
  reducer: {
    cocktails: cocktailsSlice,
    details: detailSlice,
    search: searchSlice,
  },
});