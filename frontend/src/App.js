import React from "react";
import "./App.scss";
import { Route, Link, Switch } from "react-router-dom";
import ProductSearchPage from "./views/ProductSearchPage";
import ProductList from "./views/ProductList";

const App = props => {
  // const route = window.location.pathname;
  // console.log("Route ", route)

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={ProductSearchPage} />
        <Route path="/products" component={ProductList} />
      </Switch>
    </div>
  );
};

export default App;
