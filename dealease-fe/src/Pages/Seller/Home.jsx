import React, { useEffect } from "react";
import { useState } from "react";
import { TableComponent } from "../../Components/Table/Table";
import "../../assets/scss/global.scss";
// import { HeroSection } from "../../Components/Section/HeroSection";
import { Card } from "../../Components/Card/Card";
import { H1 } from "../../Components/Helpers/index.style";
import {
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Container,
} from "react-bootstrap";
import { Footer } from "../../Components/Footer/Footer";
import PUBLIC_URL from "../../api/public_url";
import "../../assets/scss/card.scss";
import "../../assets/scss/button.scss";
import "../../assets/scss/post-section.scss";
import axiosClient from "../../api/axios";
import { Notification } from "../../Components/Notification/Notification";
import useProductContext from "../../Hooks/Context/ProductContext";
import useAuthContext from "../../Hooks/Context/AuthContext";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
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
import { Link } from "react-router-dom";
export const HomeSeller = () => {
  const { collapseSidebar } = useProSidebar();
  return (
    <>
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
              component={<Link to="/seller/home" />}
            >
              <FontAwesomeIcon icon={faHouse} className="navs-icon" />
              Home
            </MenuItem>
            <SubMenu label="Transactions">
              {/* <FontAwesomeIcon icon={faInbox} className="navs-icon" /> */}
              <MenuItem component={<Link to="/seller/withdraw" />}>
                Withdraw
              </MenuItem>
              {/* <MenuItem component={<Link to="/recharge" />}>Recharge</MenuItem> */}
            </SubMenu>
            <MenuItem
              className="text-black"
              component={<Link to="/seller/inbox" />}
            >
              <FontAwesomeIcon icon={faInbox} className="navs-icon" />
              Inbox
            </MenuItem>
          </Menu>
        </Sidebar>
        <main className="w-100" style={{ minHeight: "815px" }}>
          <div className="post_container mb-5">
            <Container className="container_item px-5">
              <H1>HOME</H1>
            </Container>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
