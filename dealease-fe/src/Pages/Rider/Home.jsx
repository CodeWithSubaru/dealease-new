// import { Adsense } from '@ctrl/react-adsense';
import React, { useState, useEffect } from "react";
import useAuthContext from "../../Hooks/Context/AuthContext";
import { Ridertransaction } from "../../Components/Pages/Ridertransaction";
import { Footer } from "../../Components/Footer/Footer";
import {
  Modal,
  Row,
  Col,
  Container,
  Nav,
  Tab,
  Card,
  Dropdown,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBurger,
  faHamburger,
  faHouse,
  faSliders,
  faTable,
  faToggleOn,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import "../../assets/scss/navbar.scss";
import { Link } from "react-router-dom";
import PUBLIC_PATH from "../../api/public_url";
import Header from "../../Components/Header/Header";
export const HomeRider = () => {
  const { user, setEmailVerified, setRegistrationSuccess } = useAuthContext();
  const { collapseSidebar } = useProSidebar();
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    return () => {
      setRegistrationSuccess(false);
      setEmailVerified(false);
    };
  }, []);
  const header = [
    {
      title: "Full Name",
      prop: "fullname",
      isSortable: true,
    },

    {
      title: "Address",
      prop: "",
      isSortable: true,
    },
    {
      title: "Mobile Number",
      prop: "",
      isSortable: true,
    },

    {
      title: "Date Request",
      prop: "created_at",
      isSortable: true,
    },
    {
      title: "Total Amount",
      prop: "payment_total_amount",
      isSortable: true,
    },
    {
      title: "Status",
      prop: "payment_status",
      isFilterable: true,
      isSortable: true,
    },
    { title: "Action", prop: "action" },
  ];
  const [body, setBody] = useState([]);
  return (
    <>
      <Header>
        {" "}
        <div className="div-dropdown me-3">
          <Dropdown as={ButtonGroup} className="dropdown-button">
            <Button variant="dark" className="dropdown-logout">
              <img
                className="dropdown-logout-profile me-2"
                src={PUBLIC_PATH + "images/" + user.prof_img}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "fit",
                }}
              />
              {user.first_name}
            </Button>

            <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={"/seller/profile"}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={"/seller/change-password"}>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Header>
      <div style={{ display: "flex", height: "100%" }}>
        <Sidebar
          width="190px"
          collapsedWidth="65px"
          transitionDuration="500"
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#1f98f4",
            },
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: disabled ? "#f5d9ff" : "#white",
                    backgroundColor: active ? "#eecef9" : undefined,
                  };
              },
            }}
          >
            <button className="btn" onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faBars} className="navs-icon" />
            </button>

            <MenuItem
              className="text-black "
              // icon={<FaHouse />}
              component={<Link to="/rider/home" />}
            >
              <FontAwesomeIcon icon={faHouse} className="navs-icon" />
              Home
            </MenuItem>
            <SubMenu label="Transactions">
              <MenuItem component={<Link to="/withdraw" />}>
                <FontAwesomeIcon icon={faInbox} className="navs-icon" />
                Withdraw
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
        <main className="w-100" style={{ minHeight: "815px" }}>
          <button className="btn btn-dark" to={"/recharge"}>
            Withdraw
          </button>
          <div className="row justify-content-center">
            <div className="col-xl-3 col-md-6">
              <Card>
                <Card.Body className="bg-primary ">
                  <p className="text-white">Information</p>
                  <hr />
                  <p className="small text-white  ">Total Deliver</p>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </Card.Body>
              </Card>
              <div className="card bg-primary text-white  mb-4"></div>
            </div>
            <div className="col-xl-3 col-md-6">
              <Card>
                <Card.Body className="bg-warning ">
                  <p className="text-white">Information</p>
                  <hr />
                  <p className="small text-white  ">Total Cancel</p>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </Card.Body>
              </Card>
              <div className="card bg-primary text-white  mb-4"></div>
            </div>
            <div className="col-xl-3 col-md-6">
              <Card>
                <Card.Body className="bg-success ">
                  <p className="text-white">Information</p>
                  <hr />
                  <p className="small text-white  ">Total Wallet Balance</p>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </Card.Body>
              </Card>
              <div className="card bg-primary text-white  mb-4"></div>
            </div>
          </div>
          <Ridertransaction header={header} body={body} />
        </main>
        <Footer />
      </div>
    </>
  );
};
