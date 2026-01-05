import React from "react";
import { team } from "../../dummydata";

const TeamCard = () => {
  return (
    <>
      {team.map((val, idx) => (
        <article
          className="teamCard shadow"
          key={`${val.name}-${idx}`}
          data-aos="fade-up"
          data-aos-delay={idx * 90}
          data-aos-duration="900"
        >
          <div className="teamImgWrap">
            <img src={val.cover} alt={val.name} loading="lazy" />

            <div className="teamOverlay" aria-hidden="true">
              <a className="teamSocialIcon" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f" aria-hidden="true"></i>
              </a>
              <a className="teamSocialIcon" href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter" aria-hidden="true"></i>
              </a>
              <a className="teamSocialIcon" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>
              <a className="teamSocialIcon" href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                <i className="fab fa-tiktok" aria-hidden="true"></i>
              </a>
            </div>

            <div className="teamCornerBadge" aria-hidden="true">IMS</div>
          </div>

          <div className="teamDetails">
            <h2 className="teamName">{val.name}</h2>
            <p className="teamRole">{val.work}</p>

            <div className="teamTags" aria-hidden="true">
              <span className="teamTag">#Mentor</span>
              <span className="teamTag">#Teacher</span>
              <span className="teamTag">#Guide</span>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default TeamCard;
