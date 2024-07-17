import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '@/utils';
import { toast } from '@/components/ui/use-toast';

const defaultState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  orderTotal: 0,
  tax: 0,
};

const getCartFromLocalStorage = (): CartState => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload;
      const cartItem = state.cartItems.find(
        (item) => item.cartID === newCartItem.cartID
      );

      if (cartItem) {
        cartItem.amount += newCartItem.amount;
      } else {
        state.cartItems.push(newCartItem);
      }

      // calculate values
      state.numItemsInCart += newCartItem.amount;
      state.cartTotal += Number(newCartItem.price) * newCartItem.amount;
      // state.tax += 0.1 * state.cartTotal;
      // state.orderTotal += state.cartTotal + state.shipping + state.tax;
      // set in local storage
      // localStorage.setItem('cart', JSON.stringify(state));
      cartSlice.caseReducers.calculateValues(state);
      toast({ description: 'Item added to the cart!' });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const cartID = action.payload;
      const cartItem = state.cartItems.find((item) => item.cartID === cartID);

      if (!cartItem) return;

      state.cartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );
      state.numItemsInCart -= cartItem.amount;
      state.cartTotal -= Number(cartItem.price) * cartItem.amount;

      cartSlice.caseReducers.calculateValues(state);
      toast({ description: 'Item is removed from the cart' });
    },
    editItem: (
      state,
      action: PayloadAction<{ cartID: string; amount: number }>
    ) => {
      const { cartID, amount } = action.payload;
      const cartItem = state.cartItems.find((item) => item.cartID === cartID);
      if (!cartItem) {
        return;
      }

      state.numItemsInCart += amount - cartItem.amount;
      state.cartTotal += Number(cartItem.price) * amount - cartItem.amount;

      cartSlice.caseReducers.calculateValues(state);
      toast({ description: 'Amount updated successfully!' });
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },
    calculateValues: (state) => {
      state.tax += 0.1 * state.cartTotal;
      state.orderTotal += state.cartTotal + state.shipping + state.tax;
      // set in local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, clearCart, editItem } = cartSlice.actions;

export default cartSlice.reducer;
