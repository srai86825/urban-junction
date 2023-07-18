import React from "react";
import Link from "next/link";
import { urlFor } from "@lib/client";

import "./product.css";

const Product = ({ product }) => {
  if (!product) return <p>Product not Found</p>;

  const { name, slug, price, image } = product;
  return (
    <div> 
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          {image.length && (
            <img
              src={urlFor(image[0]).width(250).height(250).url()}
              className="product-image"
            />
          )}
          <p className="product-name">{name}</p>
          <p className="product-price">₹{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
