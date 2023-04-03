import React, { useContext, useState } from "react";
import classes from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../App";

const Card = ({
  id,
  imgUrl,
  name,
  price,
  isInCart,
  isInFavorites,
  isLoading,
}) => {
  const {
    onAddToCart,
    onRemoveFromCart,
    onAddToFavorites,
    onRemoveFromFavorites,
  } = useContext(AppContext);
  const [isAdded, setIsAdded] = useState(isInCart);
  const [isFavorite, setIsFavorite] = useState(isInFavorites);

  const onToggleCart = () => {
    onRemoveFromCart(
      { id, name, price, imgUrl, isInCart: false, isInFavorites },
      isAdded
    );
    onAddToCart(
      { id, name, price, imgUrl, isInCart: true, isInFavorites },
      isAdded
    );
    setIsAdded(!isAdded);
  };

  const onToggleFavorites = () => {
    onRemoveFromFavorites(
      { id, name, price, imgUrl, isInCart, isInFavorites: false },
      isFavorite
    );
    onAddToFavorites(
      { id, name, price, imgUrl, isInCart, isInFavorites: true },
      isFavorite
    );
    setIsFavorite(!isFavorite);
  };
  return (
    <div className={classes.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={152}
          height={187}
          viewBox="0 0 152 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="106" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="125" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="162" rx="8" ry="8" width="80" height="24" />
          <rect x="120" y="154" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div onClick={onToggleFavorites} className={classes.favorite}>
            <img
              src={
                isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
              }
              alt="favorite icon"
            />
          </div>
          <img
            className={classes.shoeIMG}
            width={133}
            height={112}
            src={imgUrl}
            alt="shoe"
          />
          <h5>{name}</h5>
          <div className={classes.shoePrice}>
            <div>
              <p>Цена:</p>
              <b>{price} руб.</b>
            </div>
            <button onClick={onToggleCart}>
              <img
                src={isAdded ? "/img/btn-checked.svg" : "/img/add.svg"}
                alt="add icon"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
