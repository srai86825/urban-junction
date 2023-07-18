"use client";
import product from "@sanity/product";
import { Content } from "next/font/google";
import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  let foundItem;
  let index;

  const incQty = () => {
    setQty((prev) => prev + 1);
  };
  const decQty = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCart = (prod, q) => {
    const alreadyInCart = cartItems?.find((item) => item._id === prod._id);

    setTotalQuantity((prev) => prev + qty);
    setPrice((prev) => prev + prod.price * q);

    if (alreadyInCart) {
      const updatedCart = cartItems.map((item) =>
        item._id !== prod._id ? item : { ...item, quantity: q }
      );
      setCartItems(updatedCart);
    } else {
      prod.quantity = q;
      setCartItems((prev) => [prod, ...prev]);
    }
    toast.success(`${q} ${prod.name} added to cart.`);
  };

  const toggleItemQuantity = (id, val) => {
    foundItem = cartItems.find((it, i) => it._id === id);
    index = cartItems.findIndex((p) => p._id === id);

    let newCartItems = cartItems;
    
    if (val === "inc") {
      newCartItems[index] = { ...foundItem, quantity: foundItem.quantity + 1 };

      setCartItems(newCartItems);
      setTotalQuantity((p) => p + 1);
      setPrice((prev) => prev + foundItem.price);
    } else if (val === "dec") {
      if (foundItem.quantity > 1) {
        newCartItems[index] = {
          ...foundItem,
          quantity: foundItem.quantity - 1,
        };

        setCartItems(newCartItems);
        setTotalQuantity((prev) => prev - 1);
        setPrice((prev) => prev - foundItem.price);
      }
    }
  };

  const removeItem = (id) => {
    foundItem = cartItems.find((it, i) => it._id === id);
    setTotalQuantity((prev) => prev - foundItem.quantity);
    setPrice((prev) => prev - foundItem.quantity * foundItem.price);
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        setCartItems,
        price,
        setPrice,
        totalQuantity,
        setTotalQuantity,
        qty,
        incQty,
        decQty,
        addToCart,
        setShowCart,
        toggleItemQuantity,
        removeItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
