// import { CardStyle } from '../../Components/Card/Card.style';
import {
  faEnvelope,
  faEnvelopeSquare,
  faKey,
  faLockOpen,
  faSquareEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { H1 } from "../../Components/Helpers/index.style";
import useAuthContext from "../../Hooks/Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const is_buyer = 1,
    is_seller = [0, 1],
    role_type = 0;
  const { loginBuyer, errors, setErrors } = useAuthContext();

  const handleLogin = (e) => {
    e.preventDefault();
    loginBuyer({ email, password, is_buyer, is_seller, role_type });
  };

  return (
    <>
      <div className="Auth-form-container">
        <form onSubmit={handleLogin} className="Auth-form">
          <div className="Auth-form-content">
            <H1 className="Auth-form-title">Login</H1>
            <div className="form-group mt-3">
              <div>
                <label htmlFor="">Email</label>
                <small className="errMsg">
                  {errors && errors.email ? errors.email[0] : ""}
                </small>
              </div>
              <div>
                <div className="login-wrapper">
                  <FontAwesomeIcon icon={faEnvelope} className="login-icon" />
                  <input
                    type="email"
                    className="login-input form-control mt-1"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    // required
                    autoFocus
                  />
                </div>
              </div>
            </div>
            <div className="form-group my-3">
              <div>
                <label htmlFor="">Password</label>
                <small className="errMsg">
                  {errors && errors.password ? errors.password[0] : ""}
                </small>
              </div>
              <div>
                <div className="login-wrapper">
                  <FontAwesomeIcon icon={faKey} className="login-icon" />
                  <input
                    type="password"
                    className="login-input form-control mt-1"
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    pattern=".{8,}"
                    // required
                  />
                </div>
              </div>
            </div>

            <div className="remember_me-wrapper mt-2">
              <Link to="/register" className="fw-bold text-right">
                Register
              </Link>
            </div>

            {/* <PrimaryBtnStyle
          backgroundColor="#efa726"
          hoverBgColor="#d69215"
          btnTitle="Login"
        /> */}
            <div className=" mt-3">
              <button type="submit" className="btn btn-submit">
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <div className="login-description">
        <p className="login-details">Please login your credentials</p>
        <slot name="login-img" />
      </div> */}
    </>
  );
};
