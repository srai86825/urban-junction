"use client";
import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "@context/StateContext";
import "./cart.css";
import { urlFor } from "@lib/client";
import getStripe from "@lib/getStripe";

const Cart = () => {
  const CartRef = useRef();
  const {
    setShowCart,
    price,
    totalQuantity,
    cartItems,
    toggleItemQuantity,
    removeItem,
  } = useStateContext();
 
  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItems),
      });
      toast.loading("Redirecting...");
      const data = await response.json();
      // const data = await response;
      console.log("successfull checkout: ", data);

      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="cart-wrapper" ref={CartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantity} items)</span>
        </button>

        {cartItems.length ? (
          <div className="product-container">
            {cartItems.map((item, i) => (
              <div key={`cart-item-${i}-${item.name}`} className="product">
                <img
                  className="cart-product-image"
                  src={urlFor(item.image[0])}
                />

                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>₹{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => {
                            toggleItemQuantity(item._id, "dec");
                          }}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => {
                            toggleItemQuantity(item._id, "inc");
                          }}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => {
                        removeItem(item._id);
                      }}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart">
            <AiOutlineShopping />
            <h3>You Shopping bag is empty.</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        {cartItems.length && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Total: </h3>
              <h3>₹{price}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
