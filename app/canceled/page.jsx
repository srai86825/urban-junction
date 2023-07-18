import React from "react";
import { BsFillEmojiFrownFill } from "react-icons/bs";

import "../success/success.css";

const page = () => {
  return (
    <div className="cancel-wrapper">
      <div className="cancel">
        <div className="icon">
          <BsFillEmojiFrownFill />
        </div>

        <p>Sorry, the checkout was not successfull.</p>
        <button className="btn">Shop</button>
      </div>
    </div>
  );
};

export default page;
