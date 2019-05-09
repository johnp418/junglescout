import React, { useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { addProduct } from "../api";
import "./ProductSearchPage.scss";

const ProductSearchPage = () => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  const onProductSubmit = async e => {
    if (loading) return;
    e.preventDefault();

    let ASIN = inputRef.current.value.trim();
    setLoading(true);
    setError(null);
    try {
      const newProduct = await addProduct(ASIN);
      setProduct(newProduct);
    } catch (err) {
      setError(err.response.data);
    }
    setLoading(false);
  };

  return (
    <div className="search-page">
      <div className="search-header">Enter ASIN to add a new product</div>
      <form onSubmit={onProductSubmit}>
        <input type="text" placeholder="Enter Product ASIN" ref={inputRef} />
        <button disabled={loading} type="submit">
          +
        </button>
      </form>
      {error && (
        <div className="error-message">
          <div>Something went wrong. Try again later</div>
          <div>{error.toString()}</div>
        </div>
      )}
      {loading && <div>Loading...</div>}
      {product && (
        <div>
          <ProductCard product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductSearchPage;
