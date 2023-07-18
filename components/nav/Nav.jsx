"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";

import "./nav.css";
import logo from "../../assets/logo.svg";
import { useStateContext } from "@context/StateContext";
import { Cart } from "@components";
const Nav = () => {
  const { totalQuantity,showCart, setShowCart } = useStateContext();
  return (
    <div className="navbar-container">
      <Link href="/" className="logo">
        <Image src={logo} alt="something" />
      </Link>
      <button className="cart-icon" type="button" onClick={() => {setShowCart(true)}}>
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQuantity}</span>
      </button>
     {showCart && <Cart />}
    </div>
  );
};

export default Nav;
