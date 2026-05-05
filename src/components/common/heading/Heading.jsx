import React from "react";

const renderTitle = (title) => {
  if (typeof title !== "string" || !title.includes("&")) return title;
  const parts = title.split(/(&)/);
  return parts.map((part, i) =>
    part === "&" ? (
      <span key={i} className="heading-ampersand">
        &
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

const Heading = ({ subtitle, title }) => {
  return (
    <>
      <div id="heading">
        <h3>{subtitle} </h3>
        <h1>{renderTitle(title)} </h1>
      </div>
    </>
  );
};

export default Heading
