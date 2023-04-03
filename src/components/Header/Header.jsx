import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

function Header(props) {
  return (
    <header>
      <Link to="/">
        <div className={classes.headerLeft}>
          <img width={40} height={40} src="/img/logo.png" alt="" />
          <div className={classes.headerInfo}>
            <h3>Shoe Shop</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className={classes.headerRight}>
        <li className={classes.headerCartSVG}>
          <img onClick={props.openCart} src="/img/cart.svg" alt="" />
          <span>1205 руб.</span>
        </li>
        <li className={classes.headerFavoritesSVG}>
          <Link to="/favorites">
            <img src="/img/favorites.svg" alt="Favorites" />
          </Link>
        </li>
        <li className={classes.headerUserSVG}>
          <img src="/img/user.svg" alt="" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
