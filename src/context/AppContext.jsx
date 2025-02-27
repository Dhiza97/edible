"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok) setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart(user.id);
      fetchLikes(user.id);
    }
  }, [user]);

  // Fetch likes
  const fetchLikes = async (userId) => {
    try {
      const res = await fetch(`/api/likes?userId=${userId}`);
      const data = await res.json();
      if (res.ok) setLikes(Array.isArray(data.likes) ? data.likes : []);
    } catch (error) {
      console.error("Error fetching likes:", error);
      setLikes([]);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Logged out successfully!");
        setUser(null);
        console.log("User after logout:", user);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Fetch cart items
  const fetchCart = async (userId) => {
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      const data = await res.json();
      if (res.ok) setCart(Array.isArray(data.cart) ? data.cart : []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart(user.id);
    }
  }, [user]);

  // Add to cart function
  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId: String(product.id),
          addedAt: Date.now(),
        }),
      });

      if (res.ok) {
        const newItem = await res.json();
        setCart((prev) => [...prev, { ...newItem, addedAt: Date.now() }]);
        toast.success(`${product.name} added to cart!`);
      } else {
        console.error("Failed to add to cart:", res.statusText);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Update cart function
  const updateCartItem = async (productId, action) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId, action }),
      });
  
      if (res.ok) {
        const updatedCart = await res.json();
        setCart((prev) => {
          const updatedItemIndex = prev.findIndex(
            (item) => item.productId === productId
          );
          if (updatedItemIndex !== -1) {
            if (updatedCart.quantity === 0) {
              // Remove item from cart if quantity is zero
              return [
                ...prev.slice(0, updatedItemIndex),
                ...prev.slice(updatedItemIndex + 1),
              ];
            } else {
              const updatedItem = {
                ...prev[updatedItemIndex],
                quantity: updatedCart.quantity,
              };
              return [
                ...prev.slice(0, updatedItemIndex),
                updatedItem,
                ...prev.slice(updatedItemIndex + 1),
              ];
            }
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  
  // Increase quantity
  const increaseQuantity = async (productId) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId,
          action: "increase",
        }),
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setCart((prev) =>
          prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: updatedItem.quantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (productId) => {
    try {
      const item = cart.find((item) => item.productId === productId);
      if (item && item.quantity <= 1) {
        toast.error("Quantity cannot be less than 1");
        return;
      }
  
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId,
          action: "decrease",
        }),
      });
  
      if (res.ok) {
        const updatedItem = await res.json();
        setCart((prev) =>
          updatedItem.quantity === 0
            ? prev.filter((item) => item.productId !== productId)
            : prev.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: updatedItem.quantity }
                  : item
              )
        );
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });

      if (res.ok) {
        fetchCart(user.id); // Refetch the cart from the database
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Toggle like function
  const toggleLike = async (productId) => {
    if (!user) {
      toast.error("Please log in to like products.");
      return;
    }

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });

      if (res.ok) {
        fetchLikes(user.id); // Refetch the likes from the database
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        logout,
        cart,
        fetchCart,
        addToCart,
        updateCartItem,
        products,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        likes,
        toggleLike,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
