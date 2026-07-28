import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product) => {
  const exist = cartItems.find(
    (item) =>
      item._id === product._id &&
      item.weight === product.weight &&
      item.deliveryDate === product.deliveryDate &&
      item.deliveryTime === product.deliveryTime &&
      item.cakeMessage === product.cakeMessage
  );

  if (exist) {
    setCartItems(
      cartItems.map((item) =>
        item === exist
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  } else {
    setCartItems([
      ...cartItems,
      {
        ...product,
        quantity: 1,
      },
    ]);
  }
};

  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter(
        (item) => item._id !== id
      )
    );
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Number(quantity),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
  <CartContext.Provider
  value={{
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }}
>
    
      {children}
    </CartContext.Provider>
  );
}