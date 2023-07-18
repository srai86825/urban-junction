import React from "react";
import Link from "next/link";

import "./heroBanner.css";
import { urlFor } from "@lib/client";
const HeroBanner = ({ banner }) => {
  // console.log(banner);
 
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{banner.smallText}</p>
        <h3>{banner.midText}</h3>
        <h1>{banner.largeText1}</h1>
        {banner.image && (
          <img
            src={urlFor(banner.image).url()}
            className="hero-banner-image"
            alt="hero-banner-img"
          />
        )}
        <div>
          <Link href={`/product/${banner.product}`}>
            <button>{banner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{banner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
