import React from "react";

import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
export function CardItem(props) {
  return (
    <>
      <li className="cards_item">
        <Link className="cards_item_link" to={props.path}>
          <figure className="cards_item_pic-wrap" data-category={props.label}>
            <img src={props.src} alt="Fish" className="cards_item_img" />
          </figure>
          <div className="cards_item_info">
            <h5 className="cards_item_text">{props.text}</h5>
            <button className="btn make-deal">{props.button}</button>
          </div>
        </Link>
      </li>
    </>
  );
}
