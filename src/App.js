import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Favorites from "./pages/Favorites";

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoritesItems, setFavoritesItems] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoadingCards, setIsLoadingCards] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const allItems = await axios.get("http://localhost:8080/products");
      const allCartItems = await axios.get("http://localhost:8080/cart");
      const allFavorites = await axios.get("http://localhost:8080/favorites");

      setIsLoadingCards(false);

      setItems(allItems.data);
      setCartItems(allCartItems.data);
      setFavoritesItems(allFavorites.data);
    }

    fetchData();
  }, []);

  const onAddToCart = async (cartItem, isAddedToCart) => {
    try {
      if (!isAddedToCart) {
        await axios.post("http://localhost:8080/cart", cartItem);
        setCartItems((prev) => [...prev, cartItem]);
        await axios.put(
          `http://localhost:8080/products/${cartItem.id}`,
          cartItem
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFromCart = async (cartItem, isAddedToCart) => {
    try {
      if (isAddedToCart) {
        const newCartItems = cartItems.filter(
          (item) => item.id !== cartItem.id
        );
        await axios.delete(`http://localhost:8080/cart/${cartItem.id}`);
        setCartItems(newCartItems);
        await axios.put(
          `http://localhost:8080/products/${cartItem.id}`,
          cartItem
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAddToFavorites = async (favoritesItem, isAddedToFavorites) => {
    try {
      if (!isAddedToFavorites) {
        await axios.post("http://localhost:8080/favorites", favoritesItem);
        setFavoritesItems((prev) => [...prev, favoritesItem]);
        await axios.put(
          `http://localhost:8080/products/${favoritesItem.id}`,
          favoritesItem
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFromFavorites = async (favoritesItem, isAddedToFavorites) => {
    try {
      if (isAddedToFavorites) {
        const newFavoriteItems = favoritesItems.filter(
          (item) => item.id !== favoritesItem.id
        );
        await axios.delete(
          `http://localhost:8080/favorites/${favoritesItem.id}`
        );
        setFavoritesItems(newFavoriteItems);
        await axios.put(
          `http://localhost:8080/products/${favoritesItem.id}`,
          favoritesItem
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenCart = () => {
    setIsCartOpened(true);
  };

  const onCloseCart = () => {
    setIsCartOpened(false);
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <AppContext.Provider
      value={{
        onAddToCart,
        onRemoveFromCart,
        onAddToFavorites,
        onRemoveFromFavorites,
      }}
    >
      <div className="wrapper">
        {isCartOpened && (
          <Drawer
            items={cartItems}
            closeCart={onCloseCart}
            removeFromCart={onRemoveFromCart}
          />
        )}
        <Header openCart={onOpenCart} />

        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                isLoading={isLoadingCards}
              />
            }
          />
          <Route
            path="favorites"
            element={<Favorites items={favoritesItems} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
