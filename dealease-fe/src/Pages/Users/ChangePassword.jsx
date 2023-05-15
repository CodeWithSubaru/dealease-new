import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosClient from "../../api/axios";
import { Notification } from "../../Components/Notification/Notification";
import useAuthContext from "../../Hooks/Context/AuthContext";
import { Form, Container } from "react-bootstrap";
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
import { Footer } from "../../Components/Footer/Footer";

export function ChangePasswordUser() {
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState({});
  const { logout } = useAuthContext();
  const { collapseSidebar } = useProSidebar();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/change-password", password)
      .then((res) => {
        if (res.status === 200) {
          Notification({
            title: "Success",
            message:
              "Your password has been changed. You will be redirected to home page",
            icon: "success",
          }).then(() => {
            logout();
          });
        }
        setErrors([]);
      })
      .catch((e) => {
        Notification({
          title: "Error",
          message: "Something went wrong",
          icon: "error",
        }).then(() => setErrors(e.response.data.errors));
      });
  };

  useEffect(() => {
    setErrors([]);
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
          <Container style={{ margin: "0px", width: "50%" }}>
            <form onSubmit={handleSubmit}>
              <h3>Change Password</h3>
              <Form.Group className="mb-3">
                <Form.Label>Old Password *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Old Password"
                  onChange={(e) =>
                    setPassword({ ...password, old_password: e.target.value })
                  }
                  isInvalid={!!errors}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.old_password &&
                    errors.old_password.length > 0 &&
                    errors.old_password[0]}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  onChange={(e) =>
                    setPassword({ ...password, new_password: e.target.value })
                  }
                  isInvalid={!!errors}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.new_password &&
                    errors.new_password.length > 0 &&
                    errors.new_password[0]}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-Enter Confirm Password"
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      new_password_confirmation: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <button className="btn btn-primary w-100">Submit</button>
            </form>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}
