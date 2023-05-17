import React, { useEffect, useState } from "react";
import useAuthContext from "../../Hooks/Context/AuthContext";
import { Card } from "../../Components/Card/Card";
import { Footer } from "../../Components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";
import { Notification } from "../../Components/Notification/Notification";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Button, Modal, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import useOrderContext from "../../Hooks/Context/OrderContext";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axiosClient from "../../api/axios";

export const HomeUser = () => {
  const [updateAccessModal, setUpdateAccessModal] = useState(false);
  const { user, setEmailVerified, setRegistrationSuccess } = useAuthContext();
  const { collapseSidebar } = useProSidebar();
  const { setDoneTransaction } = useOrderContext();
  const [errors, setErrors] = useState([]);

  function closeUpdateAccessModal() {
    setUpdateAccessModal(false);
  }
  // terms and condition modal
  const [check, setCheck] = useState(false);
  const handleCheckboxChange = (e) => {
    setCheck(e.target.checked);
    sessionStorage.setItem("check-subs-agreement", e.target.checked);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //
  const [validIdFront, setValidIdFront] = useState(null);
  const [validIdBack, setValidIdBack] = useState(null);
  const [imgFront, setImgFront] = useState(null);
  const [imgBack, setImgBack] = useState(null);
  const [termsAndCondition, setTermsAndCondition] = useState(false);

  const onImageChangeFront = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImgFront(URL.createObjectURL(event.target.files[0]));
      setValidIdFront(event.target.files[0]);
    }
  };

  const onImageChangeBack = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImgBack(URL.createObjectURL(event.target.files[0]));
      setValidIdBack(event.target.files[0]);
    }
  };

  function handleUpdateAccessForm(e) {
    e.preventDefault();

    const data = {
      valid_id_front: validIdFront,
      valid_id_back: validIdBack,
      terms_and_conditions: termsAndCondition,
    };

    axiosClient
      .post("/update-access", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        Notification({
          title: "Success",
          message: res.data.status,
          icon: "success",
        }).then(() => {
          closeUpdateAccessModal();
        });
      })
      .catch((e) => setErrors(e.response.data.errors));
  }

  useEffect(() => {
    setDoneTransaction(false);
    setImgFront("../../../images/default_image.png");
    setImgBack("../../../images/default_image.png");
    return () => {
      setRegistrationSuccess(false);
      setEmailVerified(false);
    };
  }, []);

  return (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <Sidebar
          width="190px"
          collapsedWidth="65px"
          transitionDuration="500"
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#19a9d0",
            },
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                if (level === 0)
                  return {
                    color: disabled ? "#f5d9ff" : "#white",
                    backgroundColor: active ? "#eecef9" : undefined,
                  };
              },
            }}
          >
            <button className="btn " onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faBars} className="navs-icon" />
            </button>

            <MenuItem className="text-black " component={<Link to="/" />}>
              Home
            </MenuItem>

            <MenuItem component={<Link to="/withdraw" />}> Withdraw </MenuItem>
            <MenuItem component={<Link to="/recharge" />}> Recharge </MenuItem>
            {user.verified_user ? (
              <MenuItem component={<Link to="/product" />}> Product </MenuItem>
            ) : (
              <div className="d-flex flex-column justify-content-end flex-grow-1 h-100">
                <Button
                  className="btn btn-sm d-inline-block"
                  onClick={() => setUpdateAccessModal(true)}
                >
                  Update Access
                </Button>
              </div>
            )}
          </Menu>
        </Sidebar>
        <main className="w-100 ">
          <Modal
            show={updateAccessModal}
            onHide={closeUpdateAccessModal}
            animation={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title className="fw-semibold">
                Request Update Acccess
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Alert show={true} variant="success">
                <div className="d-flex justify-content-between">
                  <Alert.Heading>Instruction </Alert.Heading>

                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        <div className="p-2 text-start">
                          Once you didn't follow the instruction, we will
                          automatically reject your request.
                        </div>
                      </Tooltip>
                    }
                  >
                    <FontAwesomeIcon icon={faExclamationCircle} />
                  </OverlayTrigger>
                </div>
                <ul>
                  <li>
                    Please make sure that both pictures of the government IDs
                    are clear and valid.
                  </li>
                </ul>
                <hr />
                <div className="clearfix">
                  <p className="float-end mb-0"> - System Administator</p>
                </div>
              </Alert>
              <Form onSubmit={handleUpdateAccessForm} id="updateAccessForm">
                <div className="d-flex align-items-center clearfix mb-3">
                  <Form.Group controlId="formFile" className="mb-3 w-100">
                    <Form.Label className="text-secondary">
                      Valid Government Id (Front)
                    </Form.Label>
                    <Form.Control
                      type="file"
                      id="formFile"
                      onChange={onImageChangeFront}
                      isInvalid={!!errors.valid_id_front}
                    />
                    {console.log(errors)}
                    <Form.Control.Feedback type="invalid">
                      {errors.valid_id_front}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="w-50">
                    <div className="float-end">
                      <p className="mb-0">ID Preview (Front)</p>
                      <img
                        src={imgFront}
                        className="rounded p-3 float-end"
                        style={{
                          height: "150px",
                          width: "150px",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center clearfix">
                  <Form.Group controlId="formFile" className="w-100 mb-3">
                    <Form.Label className="text-secondary">
                      Valid Government Id (Back)
                    </Form.Label>
                    <Form.Control
                      type="file"
                      id="formFile"
                      onChange={onImageChangeBack}
                      isInvalid={!!errors.valid_id_back}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.valid_id_back}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="w-50">
                    <div className="float-end">
                      <p className="mb-0">ID Preview (Back)</p>
                      <img
                        src={imgBack}
                        className="rounded p-3 float-end"
                        style={{
                          height: "150px",
                          width: "150px",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Form.Group>
                  <Row xs="auto">
                    <Col
                      style={{
                        padding: "0 0 0 12px",
                      }}
                    >
                      <Form.Check
                        checked={check}
                        onChange={handleCheckboxChange}
                        type="checkbox"
                        id="termsAndCondition"
                        isInvalid={!!errors.terms_and_conditions}
                        feedbackType="invalid"
                        feedback={
                          errors.terms_and_conditions &&
                          errors.terms_and_conditions.length > 0 &&
                          errors.terms_and_conditions[0]
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label
                        className="text-secondary fw-light mb-0"
                        controlId="termsAndCondition"
                      >
                        I agree to the
                        <a
                          onClick={handleShow}
                          target="_blank"
                          className="fw-bold"
                        >
                          Terms and Condition
                        </a>
                      </Form.Label>
                    </Col>
                  </Row>

                  {/* <Form.Control.Feedback type='invalid' className='text-danger'>
                    {errors.length > 0 &&
                      errors.terms_and_conditions.length > 0 &&
                      errors.terms_and_conditions[0]}
                  </Form.Control.Feedback> */}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="rounded"
                onClick={closeUpdateAccessModal}
              >
                Cancel
              </Button>
              <Button
                disabled={!check}
                variant="primary"
                className="rounded"
                form="updateAccessForm"
                type="submit"
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          {/* terms and conditions modal */}

          <Modal scrollable show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Terms and Conditions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you are reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                className="rounded"
                onClick={handleClose}
              >
                I understand
              </Button>
            </Modal.Footer>
          </Modal>

          <Card />
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};
