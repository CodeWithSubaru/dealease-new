// export function Card({ className, children }) {
//   return <div className={className}>{children}</div>;
// }
import React from "react";
import { Modal, Form, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { CardItem } from "./CardItem";
import "../../assets/scss/card.scss";
import "../../assets/scss/button.scss";

export function Card() {
  return (
    <div className="cards">
      <div className="cards_container">
        <div className="cards_wrapper">
          <Container>
            <Row>
              <Col>
                <h1 className="text-home">Home</h1>
              </Col>
              <Col>
                <Form>
                  <Form.Control
                    type="search"
                    placeholder="Search..."
                    className="search-post"
                    aria-label="Search"
                  />
                </Form>
              </Col>
            </Row>
          </Container>
          {/* Card for Seller */}
          <ul className="cards_items">
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              editbutton="Edit"
              delbutton="Delete"
              path="/services"
            />
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              editbutton="Edit"
              delbutton="Delete"
              path="/services"
            />
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              editbutton="Edit"
              delbutton="Delete"
              path="/services"
            />
          </ul>

          {/* Card for buyer */}
          <ul className="cards_items">
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              editbutton="Edit"
              delbutton="Delete"
              path="/services"
            />
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              editbutton="Edit"
              delbutton="Delete"
              path="/services"
            />
            <CardItem
              src="../../../public/images/image-1.jpg"
              text="1 kilo bangus tirahin mo na baka matira pa nang iba"
              label="Sold"
              button="Make a Deal"
              editbutton="Edit"
              delbutton="Delete"
              path="/services"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
