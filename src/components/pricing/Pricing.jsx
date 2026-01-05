import React from "react";
import { price } from "../../dummydata";

const PriceCard = () => {
  return (
    <>
      {price.map((val, idx) => (
        <div
          className="priceItem"
          key={`${val.name}-${idx}`}
          data-aos="zoom-in"
          data-aos-delay={idx * 120}
          data-aos-duration="900"
        >
          <div className="planChip" aria-hidden="true">
            <i className="fa fa-bolt"></i> Popular
          </div>

          <h4 className="planName">{val.name}</h4>

          <h1 className="planPrice">
            <span className="planCurrency">₹</span>
            {val.price}
          </h1>

          <p className="planDesc">{val.desc}</p>

          <button className="outline-btn planBtn" type="button">
            GET STARTED <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      ))}
    </>
  );
};

export default PriceCard;
