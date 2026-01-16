import React from "react";
import "./loader.css";

const BookLoader = () => {
  return (
    <div className="book-loader-wrapper">
      <div className="book-loader-content">
        <div className="book">
          <div className="book__pg-shadow"></div>
          <div className="book__pg"></div>
          <div className="book__pg book__pg--2"></div>
          <div className="book__pg book__pg--3"></div>
          <div className="book__pg book__pg--4"></div>
          <div className="book__pg book__pg--5"></div>
        </div>

        {/* Heading */}
        <h2 className="loader-heading">Loading<span className="dots">...</span></h2>
      </div>
    </div>
  );
};

export default BookLoader;
