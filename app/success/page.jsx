"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import confetti from "canvas-confetti";

import { useStateContext } from "@context/StateContext";
import "./success.css";
import confettiFireworks from "@lib/confettiFirework.js";

const Success = () => {
  const { setPrice, setTotalQuantity, setCartItems } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setPrice(0);
    setTotalQuantity(0);
    setCartItems([]);
    confettiFireworks();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for the purchase!</h2>
        <p className="email">Check your email for the reciept.</p>
        <p className="description">
          If any queries, feel free to{" "}
          <a className="email" href="mailto:srai86825@gmail.com">
            srai86825@gmail.com
          </a>
        </p>
        <Link href="/">
          <button className="btn" style={{ width: "300px" }}>
            Shop more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
