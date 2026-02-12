import React from "react";

const OptimizedImage = ({
  src,
  alt,
  srcSet,
  sizes,
  className,
  loading = "lazy",
  width,
  height,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes}
      className={className}
      loading={loading}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default OptimizedImage;
