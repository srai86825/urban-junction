"use client";
import { HeroBanner, Product, FooterBanner } from "@/components";
import React, { useEffect, useState } from "react";
import { client, urlFor } from "@lib/client";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const query = "*[_type=='product']";
      const fetchedProd = await client.fetch(query);
      setProducts(fetchedProd);

      const bannerQ = "*[_type == 'banner']";
      const fetchedBanner = await client.fetch(bannerQ);
      // console.log(fetchedBanner[0]);
      setBanner(fetchedBanner[0]);
    };
    fetchData();
  }, []);
 
  return (
    <>
      {banner && <HeroBanner banner={banner} />}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>speakers of many varities</p>
      </div>
      <div className="products-container">
        {products?.map((p, i) => (
          <Product product={p} key={`product-${p.slug}-${i}`} />
        ))}
      </div>

      {banner && <FooterBanner banner={banner} />}
    </>
  );
};

export default Home;
