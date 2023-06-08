import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    products: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }
      state.totalPrice += product.price;
    },

    removeFromBasket: (state, action) => {
      const productId = action.payload;
      const removedProductIndex = state.products.findIndex(
        (product) => product.id === productId
      );
      if (removedProductIndex >= 0) {
        const removedProduct = state.products[removedProductIndex];
        state.totalPrice -= removedProduct.price * removedProduct.quantity;
        state.products.splice(removedProductIndex, 1);
      }
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        if (product.quantity > 0) {
          product.quantity--;
          state.totalPrice -= product.price;
        }
      }
    },
    clearBasket: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  removeFromBasket,
  setProducts,
  decreaseQuantity,
  clearBasket,
} = basketSlice.actions;

export const selectBasketCount = (state) => state.basket.products.length;

export default basketSlice.reducer;
