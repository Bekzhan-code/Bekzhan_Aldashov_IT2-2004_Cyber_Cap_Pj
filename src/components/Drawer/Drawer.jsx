import React from "react";
import Info from "../Info/Info";
import classes from "./Drawer.module.scss";

function Drawer({ removeFromCart, closeCart, items = [] }) {
  return (
    <div className={classes.overlay}>
      <div className={classes.drawer}>
        <div className={classes.CartHeader}>
          <h2>Корзина</h2>
          <img
            onClick={closeCart}
            src="/img/btn-remove.svg"
            alt="Remove button"
          />
        </div>

        {items.length !== 0 ? (
          <div className={classes.cartItemsData}>
            <div className={classes.items}>
              {items.map((obj) => (
                <div key={obj.id} className={classes.cartItem}>
                  <img
                    className={classes.cartShoeIMG}
                    width={70}
                    height={70}
                    src={obj.imgUrl}
                    alt="shoe"
                  />
                  <div className={classes.cartDescr}>
                    <p>{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() =>
                      removeFromCart({ ...obj, ["isInCart"]: false }, true)
                    }
                    className={classes.cartRemoveBtn}
                    src="/img/btn-remove.svg"
                    alt="Remove button"
                  />
                </div>
              ))}
            </div>

            <div className={classes.itemsSummary}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button className={`${classes.makeOrderBtn} ${classes.btn}`}>
                Оформить заказ <img src="/img/arrow.svg" alt="" />
              </button>
            </div>
          </div>
        ) : (
          <div className={classes.emptyCart}>
            <Info
              imgUrl="/img/empty-cart.svg"
              title="Корзина пустая"
              descr={`Добавьте хотя бы одну пару ${(
                <br />
              )} кроссовок, чтобы сделать
                заказ.`}
            />
            {/* <div className={classes.descr}>
              <img src="/img/empty-cart.svg" alt="Empty Cart" />
              <h3>Корзина пустая</h3>
              <p>
                Добавьте хотя бы одну пару <br /> кроссовок, чтобы сделать
                заказ.
              </p>
            </div> */}
            <button
              className={`${classes.comeBackBtn} ${classes.btn}`}
              onClick={closeCart}
            >
              <img src="/img/backward-arrow.svg" alt="" /> Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
