// import { createContext, useContext, useReducer } from 'react';

// export interface CartItemsType {
//   image: string;
//   name: string;
//   id: string;
//   rating: number;
//   discountPrice: number;
//   originalPrice: number;
// }

// export interface CartContextType {
//   cartItems: CartItemsType[];
//   addToCart: (product: CartItemsType) => void;
//   removeToCart: (product: CartItemsType) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// interface CartAction {
//   type: 'ADD_ITEM' | 'REMOVE_ITEM';
//   payload: CartItemsType;
// }

// interface CartState {
//   items: CartItemsType[];
// }

// function cartReducer(state: CartState, action: CartAction) {
//   if (action.type === 'ADD_ITEM') {
//     const existingProductIndex = state.items.findIndex((item) => item.id === action.payload.id);
//     const updateItems = [...state.items];
//     if (existingProductIndex == -1) {
//       updateItems.push({ ...action.payload });
//     }
//     localStorage.setItem('cart', JSON.stringify(updateItems));
//     return { ...state, items: updateItems };
//   }

//   if (action.type === 'REMOVE_ITEM') {
//     const existingProductIndex = state.items.findIndex((item) => item.id === action.payload.id);
//     const updateItems = [...state.items];
//     if (existingProductIndex != -1) {
//       updateItems.splice(existingProductIndex, 1);
//     }
//     localStorage.setItem('cart', JSON.stringify(updateItems));
//     return { ...state, items: updateItems };
//   }

//   return state;
// }

// const cartItems = localStorage.getItem('cart');
// const cartItemStx = cartItems ? JSON.parse(cartItems) : [];
// export default function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cart, dispatchCartAction] = useReducer(cartReducer, { items: cartItemStx ? cartItemStx : [] });

//   function addToCart(product: CartItemsType) {
//     dispatchCartAction({ type: 'ADD_ITEM', payload: product });
//     console.log(cart);
//   }

//   function removeToCart(product: CartItemsType) {
//     dispatchCartAction({ type: 'REMOVE_ITEM', payload: product });
//   }

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems: cart.items,
//         addToCart,
//         removeToCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCartInLocal() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within an CartProvider');
//   }
//   return context;
// }
