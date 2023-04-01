import React from "react";
import "../../assets/scss/global.scss";
// import { HeroSection } from "../../Components/Section/HeroSection";
import { Card } from "../../Components/Card/Card";
import {
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../../Components/Footer/footer";
import "../../assets/scss/card.scss";
import "../../assets/scss/post-section.scss";
export const HomeSeller = () => {
  return (
    <>
      <div className="post_container">
        <Container className="container_item">
          <form action="#">
            <Row className="px-5">
              <Col>
                <div className="image-container">
                  <img
                    src="../../public/images/1.jpg"
                    alt=""
                    className="imagepost float-end mb-4"
                  />
                </div>
              </Col>
              <Col lg={8}>
                <InputGroup
                  size="lg"
                  className="mb-1"
                  name="post_description"
                  id="post_description"
                >
                  <Form.Control
                    as="textarea"
                    className="form-control textarea-input"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="What's on your mind?"
                  />
                </InputGroup>
                <span name="">
                  <FontAwesomeIcon icon={faImage} className="image" />
                  <h6 className="input_text">Add Photos</h6>
                  <h5>Or drag and drop</h5>
                </span>
                <Button className="btn_post">Post</Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
      {/* <HeroSection /> */}
      <div className="cards_container"></div>
      <Card />
      <Footer />
    </>
  );
};
