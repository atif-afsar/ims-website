import React from "react";
import Back from "../common/back/Back";
import TeamCard from "./TeamCard";
import "./team.css";
import Awrapper from "../about/Awrapper";
import "../about/about.css";

const Team = () => {
  return (
    <>
      <Back title="Team" />

      <section className="teamSection sectionDecorTeam">
        {/* Decorative elements */}
        <span className="teamSticker teamStickerLeft" aria-hidden="true">🧑‍🏫</span>
        <span className="teamSticker teamStickerRight" aria-hidden="true">✨</span>

        <div className="container">
          <div className="teamHeading" data-aos="fade-up" data-aos-duration="900">
            {/* Optional: if you have a page heading component, add it here */}
          </div>

          <div className="teamGrid">
            <TeamCard />
          </div>
        </div>
      </section>

      <Awrapper />
    </>
  );
};

export default Team;
