import React from "react";
import classes from "./Info.module.scss";

function Info({ imgUrl, title, descr }) {
  return (
    <div className={classes.Info}>
      <img src={imgUrl} alt="Empty Cart" />
      <h3>{title}</h3>
      <p>{descr}</p>
    </div>
  );
}

export default Info;
