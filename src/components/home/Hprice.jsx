import React from "react";
import Heading from "../common/heading/Heading";
import PriceCard from "../pricing/PriceCard";

const Hprice = () => {
  return (
    <>
      <section className="hprice padding sectionDecorHomePrice">
        <div className="container">
          <div data-aos="fade-up" data-aos-duration="900">
            <div className="homePriceTop">
              <span className="homePriceIcon" aria-hidden="true">💛</span>
              <Heading subtitle="OUR PRICING" title="Pricing & Packages" />
              <span className="homePriceIcon" aria-hidden="true">🎁</span>
            </div>
          </div>

          <div className="price grid" data-aos="fade-up" data-aos-delay="150" data-aos-duration="900">
            <PriceCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hprice;
