import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="card">
        <img src={product.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Name: {product.name}</h5>
          <h5 className="card-title">ASIN: {product.ASIN}</h5>
          <p>Dimension: {product.dimension || "Not available"}</p>
          <p>Rank: {product.rank || "Not available"}</p>
          <p>Category: {product.category || "Not available"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
