/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
  },
  reducers: {
    addProduct: function (state, action) {
      state.items.push(action.payload);
      console.log(action);
    },
    deleteProduct: function (state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateProduct: function (state, action) {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.Name = action.payload.Name;
          item.Category = action.payload.Category;
          item.Price = action.payload.Price;
        }
      });
    },
  },
});

export const { addProduct, deleteProduct, updateProduct } =
  ProductSlice.actions;
export default ProductSlice.reducer;
