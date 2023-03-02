// export function Card({ className, children }) {
//   return <div className={className}>{children}</div>;
// }
import React from "react";
import { Modal, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { CardItem } from "./CardItem";
import "../../assets/scss/card.scss";

export function Card() {
  return (
    <div className="cards">
      <div className="wrapper">
        <form action="#">
          <span>
            <FontAwesomeIcon icon={faImage} />;<p>Browse Image to Upload</p>
          </span>
          <h9> Product Description</h9>
          <section className="text-area">
            <InputGroup size="lg" className="mb-1">
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </section>
          <Button className="btn-post">Post</Button>
        </form>
      </div>
      <div className="cards_container">
        <div className="cards_wrapper">
          <ul className="cards_items">
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              path="/services"
            />
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              path="/services"
            />
          </ul>
          <ul className="cards_items">
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              path="/services"
            />
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              path="/services"
            />
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              path="/services"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
