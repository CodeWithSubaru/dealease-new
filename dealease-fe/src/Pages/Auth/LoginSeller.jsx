// import { CardStyle } from '../../Components/Card/Card.style';
import { H1 } from "../../Components/Helpers/index.style";
import { useState, useEffect } from "react";
import useAuthContext from "../../Hooks/Context/AuthContext";
export const LoginSeller = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const is_buyer = [0, 1],
    is_seller = 1,
    role_type = 0;
  const { loginSeller, errors, setErrors } = useAuthContext();

  useEffect(() => {
    setErrors(null);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    loginSeller({ email, password, is_buyer, is_seller, role_type });
  };

  return (
    <>
      <H1>Login Seller</H1>
      <div className="login-description">
        <p className="login-details">Please login your credentials</p>
        <slot name="login-img" />
      </div>

      <form onSubmit={handleLogin}>
        <div>
          <div>
            Email
            <small className="errMsg">
              {errors && errors.email ? errors.email[0] : ""}
            </small>
          </div>
          <div>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              // required
              autoFocus
            />
          </div>
        </div>

        <div>
          <div>
            Password
            <small className="errMsg">
              {errors && errors.password ? errors.password[0] : ""}
            </small>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              pattern=".{8,}"
              // required
            />
          </div>
        </div>

        <div className="remember_me-wrapper">
          <div>
            <input
              type="checkbox"
              name="checkbox"
              id="remember-me"
              className="remember_me"
              v-model="form.rmb_me"
            />
          </div>

          <div> Remember Me </div>
        </div>
        <button to="/login">Sign Up</button>
        {/* <PrimaryBtnStyle
          backgroundColor="#efa726"
          hoverBgColor="#d69215"
          navigateTo="/login"
          btnTitle="Login"
        /> */}

        <div className="back-to-home-wrapper">
          <slot name="login-route"></slot>
          <p className="back-to-home">Go to Register</p>
        </div>
      </form>
    </>
  );
};
