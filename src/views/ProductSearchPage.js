import React, { useState, useRef } from "react";
import { addProduct } from "../api";
import "./ProductSearchPage.scss";

const ProductSearchPage = () => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState(null);

  const onProductSubmit = async e => {
    e.preventDefault();
    console.log("Submit ", inputRef.current.value);

    let ASIN = inputRef.current.value.trim();
    setLoading(true);
    try {
      const product = await addProduct(ASIN);
      setNewProduct(product);
    } catch (err) {
      setError(err);
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
      {error && <div className="error-message">Something went wrong!</div>}
      {newProduct && (
        <div>
          <div>You've added</div>
          <div>Product here</div>
        </div>
      )}
    </div>
  );
};

export default ProductSearchPage;
