"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { urlFor, client } from "@lib/client";
import { Product } from "@components";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import toast from "react-hot-toast";

import "./product.css";
import { useStateContext } from "@context/StateContext";
import getStripe from "@lib/getStripe";

const ProductPage = ({ params }) => {
  const { slug: querySlug } = params;
  const [product, setProduct] = useState();
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, addToCart } = useStateContext();

  useEffect(() => {
    if (querySlug) {
      const query = `*[_type== "product" && slug.current =="${querySlug}"]`;
      client
        .fetch(query)
        .then((res) => {
          console.log(res);
          setProduct(res[0]);
        })
        .catch((err) => {
          console.log("Couldnt fetch product: ", err);
        });
      const pQuery = "*[_type=='product']";
      client
        .fetch(pQuery)
        .then((res) => {
          setProducts(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [querySlug]);

  let toastId;
  if (!product) {
    return <p>Loading...</p>;
  }

  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ ...product, quantity: qty }]),
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
  const { image, name, details, price } = product;
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {image?.length && (
              <img
                src={urlFor(image[index]).url()}
                className="product-detail-image"
                alt="product image"
              />
            )}
          </div>
          <div className="small-images-container">
            {image?.map((img, i) => (
              <img
                key={`small-img-${i}`}
                src={urlFor(img).url()}
                alt="alternative images"
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => {
                  setIndex(i);
                }}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(38)</p>
          </div>
          <h4>Deatails</h4>
          <p>{details}</p>
          <p className="price"> ₹{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          {product !== undefined && (
            <div className="buttons">
              <button
                type="button"
                className="add-to-cart"
                onClick={() => {
                  if (product) addToCart(product, qty);
                }}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="buy-now"
                onClick={handleCheckout}
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map(
              (item, i) =>
                item._id !== product._id && (
                  <Product
                    key={`may-like-${i}-${item?.slug.current}`}
                    product={item}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
