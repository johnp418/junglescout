import React, { useState, useEffect } from "react";
import { fetchProducts, deleteProduct } from "../api";

export default () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetch() {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    fetch();
  }, []);

  const onDeleteProduct = async ASIN => {
    setLoading(true);
    try {
      const success = await deleteProduct(ASIN);
      if (success) {
        setProducts(products.filter(product => product.ASIN !== ASIN));
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.response.data}</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">ASIN</th>
          <th scope="col">Category</th>
          <th scope="col">Rank</th>
          <th scope="col">Dimension</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map(product => {
            const { ASIN, name, category, rank, dimension, imageUrl } = product;
            return (
              <tr key={ASIN}>
                <td className="product-image">
                  <img src={imageUrl} alt="..." />
                </td>
                <td>{name || "Not available"}</td>
                <td>{ASIN || "Not available"}</td>
                <td>{category || "Not available"}</td>
                <td>{rank || "Not available"}</td>
                <td>{dimension || "Not available"} </td>
                <td>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this product?"
                        )
                      ) {
                        onDeleteProduct(ASIN);
                      }
                    }}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>There is no product in the system</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
