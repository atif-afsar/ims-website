import React from "react";
import "./loader.css";

const PencilLoader = () => {
  return (
    <div className="pencil-loader-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="260"
        height="260"
        viewBox="0 0 200 200"
        className="pencil"
      >
        <defs>
          <clipPath id="pencil-eraser">
            <rect width="30" height="30" rx="5" ry="5" />
          </clipPath>
        </defs>

        <circle
          className="pencil__stroke"
          r="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="439.82 439.82"
          strokeDashoffset="439.82"
          transform="rotate(-113 100 100)"
        />

        <g transform="translate(100 100)" className="pencil__rotate">
          <g fill="none">
            <circle
              className="pencil__body1"
              r="64"
              stroke="hsl(223,90%,50%)"
              strokeWidth="30"
              strokeDasharray="402.12 402.12"
              strokeDashoffset="402"
              transform="rotate(-90)"
            />
            <circle
              className="pencil__body2"
              r="74"
              stroke="hsl(223,90%,60%)"
              strokeWidth="10"
              strokeDasharray="464.96 464.96"
              strokeDashoffset="465"
              transform="rotate(-90)"
            />
            <circle
              className="pencil__body3"
              r="54"
              stroke="hsl(223,90%,40%)"
              strokeWidth="10"
              strokeDasharray="339.29 339.29"
              strokeDashoffset="339"
              transform="rotate(-90)"
            />
          </g>

          {/* Eraser */}
          <g
            className="pencil__eraser"
            transform="rotate(-90) translate(49 0)"
          >
            <g className="pencil__eraser-skew">
              <rect width="30" height="30" rx="5" ry="5" fill="hsl(223,90%,70%)" />
              <rect
                width="5"
                height="30"
                clipPath="url(#pencil-eraser)"
                fill="hsl(223,90%,60%)"
              />
              <rect width="30" height="20" fill="hsl(223,10%,90%)" />
              <rect width="15" height="20" fill="hsl(223,10%,70%)" />
              <rect width="5" height="20" fill="hsl(223,10%,80%)" />
              <rect y="6" width="30" height="2" fill="hsla(223,10%,10%,0.2)" />
              <rect y="13" width="30" height="2" fill="hsla(223,10%,10%,0.2)" />
            </g>
          </g>

          {/* Pencil point */}
          <g
            className="pencil__point"
            transform="rotate(-90) translate(49 -30)"
          >
            <polygon
              points="15 0 30 30 0 30"
              fill="hsl(33,90%,70%)"
            />
            <polygon
              points="15 0 6 30 0 30"
              fill="hsl(33,90%,50%)"
            />
            <polygon
              points="15 0 20 10 10 10"
              fill="hsl(223,10%,10%)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default PencilLoader;
