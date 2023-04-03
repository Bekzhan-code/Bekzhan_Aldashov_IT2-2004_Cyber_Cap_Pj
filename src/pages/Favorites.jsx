import React from "react";
import classes from "./Favorites.module.scss";
import Card from "../components/Card/Card";
import Info from "../components/Info/Info";
import { Link } from "react-router-dom";

function Favorites({ items }) {
  return (
    <div className="content">
      {items.length !== 0 ? (
        <div>
          <div className="contentHeader">
            <h1 className="contentHeaderText">Мои закладки</h1>
          </div>

          <div className="cardWrapper">
            {items.map((obj) => (
              <Card
                key={obj.id}
                id={obj.id}
                name={obj.name}
                price={obj.price}
                imgUrl={obj.imgUrl}
                isInCart={obj.isInCart}
                isInFavorites={obj.isInFavorites}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={classes.emptyFavorites}>
          <Info
            imgUrl="/img/sad-emoji.svg"
            title="Закладок нет &#58;&#40;"
            descr={`Вы ничего не добавляли в закладки`}
          />
          <Link to="/">
            <button className={`${classes.comeBackBtn} ${classes.btn}`}>
              <img src="/img/backward-arrow.svg" alt="" /> Вернуться назад
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favorites;
