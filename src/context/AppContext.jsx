"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

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
      if (res.ok) setCart(data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Add to cart function
  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    console.log("Adding to cart:", {
      userId: user.id,
      productId: String(product.id),
    });

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId: String(product.id),
        }),
      });

      console.log("Response:", res);

      if (res.ok) {
        const newItem = await res.json();
        setCart((prev) => [...prev, newItem]);
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
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
