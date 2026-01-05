import React from "react";
import { FaStar, FaBaby, FaChild, FaUsers } from "react-icons/fa";

const groupIcon = (group) => {
  if (group === "pre-primary") return <FaBaby />;
  if (group === "primary") return <FaChild />;
  if (group === "middle") return <FaUsers />;
  return <FaStar />;
};

const ClassCard = ({ item }) => {
  return (
    <div className="classCard" data-aos="zoom-in" data-aos-duration="900">
      <div className="classThumb">
        <img
          src={`/images/classes/${item.group}.webp`}
          alt={`${item.name} group`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="classTop">
        <div className="classIcon" aria-hidden="true">
          {groupIcon(item.group)}
        </div>
        <div className="classBadge">{item.age}</div>
      </div>

      <h3 className="className">{item.name}</h3>
      <p className="classHint">Recommended admission age</p>
    </div>
  );
};

export default ClassCard;
