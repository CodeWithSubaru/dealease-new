import { Navigate, Outlet } from "react-router-dom";

import { Link } from "react-router-dom";
import Header from "../Components/Header/Header";
import useAuthContext from "../Hooks/Context/AuthContext";
import "../assets/scss/button.scss";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import PUBLIC_PATH from "../api/public_url";

export function AuthAdminLayout() {
  const { user, user_type, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Header>
        {/* Modified Solla */}
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-links">
            Dashboard
          </Link>
        </li>
        {user_type === "Admin" && (
          <>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-links">
                Users
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/transactions" className="nav-links">
                Transactions
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/announcement" className="nav-links">
                Announcement
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/inbox" className="nav-links">
                Inbox
              </Link>
            </li>
            <li className="nav-item">
              <div className="div-dropdown">
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
                    />{" "}
                    {user.first_name}
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant="dark"
                    id="dropdown-split-basic"
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={"/admin/profile"}>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={"/admin/change-password"}>
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
          </>
        )}
      </Header>
      {user_type === "Admin" ? <Outlet /> : <Navigate to="/admin/login" />}
    </>
  );
}
