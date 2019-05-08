import React, { useState, useEffect } from "react";
import ProductCard from "../components/Product";
import { fetchProducts } from "../api";
import "./ProductList.scss";

export default () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetch() {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {}
    }
    fetch();
  }, []);

  return (
    <div className="product-list">
      <div>
        <div>Search ?</div>
        <div className="product-list-header">
          <div className="product-column">Image</div>
          <div className="product-column">ASIN</div>
          <div className="product-column">Name</div>
          <div className="product-column">Category</div>
          <div className="product-column">Rank</div>
          <div className="product-column">Dimension</div>
        </div>
      </div>

      <div className="product-list-items">
        {products.length > 0
          ? products.map(product => {
              const {
                id,
                ASIN,
                name,
                category,
                rank,
                dimension,
                imageUrl
              } = product;
              return (
                <div key={id} className="product">
                  <div className="product-column">imagehere</div>
                  <div className="product-column">{ASIN}</div>
                  <div className="product-column">{name}</div>
                  <div className="product-column">{category}</div>
                  <div className="product-column">{rank}</div>
                  <div className="product-column">{dimension} </div>
                </div>
              );
            })
          : "There is no product in the system"}
      </div>
    </div>
  );
};
