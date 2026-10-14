
import { createContext, useEffect, useReducer } from "react";
import CartReducer from "./CartReducer";

export const CartContext = createContext();

const STORAGE_KEY = "nexus-cart";

function getInitialCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart
      .filter(
        (item) =>
          item &&
          item.id != null &&
          Number(item.quantity) > 0 &&
          Number(item.price) >= 0
      )
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Math.floor(Number(item.quantity))),
        price: Number(item.price),
        stock: Math.max(0, Math.floor(Number(item.stock) || 0)),
      }))
      .filter((item) => item.stock > 0)
      .map((item) => ({
        ...item,
        quantity: Math.min(item.quantity, item.stock),
      }));
  } catch (error) {
    console.error("Unable to restore cart:", error);
    return [];
  }
}

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    CartReducer,
    undefined,
    getInitialCart
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
