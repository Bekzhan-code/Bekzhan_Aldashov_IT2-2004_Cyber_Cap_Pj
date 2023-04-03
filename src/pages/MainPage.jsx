import React from "react";
import Card from "../components/Card/Card";

function MainPage({
  items = [],
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
  onRemoveFromCart,
  onRemoveFromFavorites,
  onAddToFavorites,
  isLoading,
}) {
  return (
    <div className="content">
      <div className="contentHeader">
        {searchValue ? (
          <h1>{`Поиск по "${searchValue}"`}</h1>
        ) : (
          <h1 className="contentHeaderText">Все кроссовки</h1>
        )}
        <div className="searchBlock">
          <img src="/img/searchIcon.svg" alt="search icon" />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            type="text"
            placeholder="Поиск"
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="inputRemoveBtn"
              src="/img/btn-remove.svg"
              alt="Remove"
            />
          )}
        </div>
      </div>

      <div className="cardWrapper">
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <Card key={index} isLoading={isLoading} />
            ))
          : items
              .filter((it) =>
                it.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((obj) => (
                <Card
                  key={obj.id}
                  id={obj.id}
                  name={obj.name}
                  price={obj.price}
                  imgUrl={obj.imgUrl}
                  isInCart={obj.isInCart}
                  isInFavorites={obj.isInFavorites}
                  addToCart={onAddToCart}
                  removeFromCart={onRemoveFromCart}
                  removeFromFavorites={onRemoveFromFavorites}
                  addToFavorites={onAddToFavorites}
                  isLoading={isLoading}
                />
              ))}
      </div>
    </div>
  );
}

export default MainPage;
