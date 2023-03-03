import { useEffect, useState } from "react";

import useAuthContext from "../../Hooks/Context/AuthContext";

export function RegisterExist() {
  const [user, setUser] = useState({
    email: null,
    password: null,
    password_confirmation: null,
  });
  const { errors, setErrors, registerExist } = useAuthContext();

  const handleRegister = (e) => {
    e.preventDefault();
    registerExist(user);
  };

  useEffect(() => {
    setErrors(null);
  }, []);

  return (
    <main>
      <div>
        <h1>Register</h1>

        <div className="register-description mb-1">
          <p className="register-details">Please provide your details</p>
          <div>
            <span className="material-symbols-rounded bulb">
              tips_and_updates
            </span>
            <ul>
              <h4>Take Note:</h4>
              <li>All fields with asterisk (*) are required</li>
            </ul>
          </div>
          <slot name="login-img" />
        </div>

        <form className="form" onSubmit={handleRegister}>
          <div className="account-details">
            <h3>Account Details</h3>
            <hr />
            <div>
              <div> Email * </div>
              <div>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  // required
                />
              </div>
            </div>
            <small className="errMsg" v-if="errors.email">
              {errors && errors.email && errors.email[0]}
            </small>

            <div>
              <div>Password * </div>
              <div>
                <input
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  // required
                />
              </div>
            </div>

            <small className="errMsg" v-if="errors.password">
              {errors && errors.password && errors.password[0]}
            </small>

            <div className="mb-1">
              <div>Confirm Password * </div>
              <div>
                <input
                  type="password"
                  name="password_confirmation"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password_confirmation: e.target.value,
                    })
                  }
                  // required
                />
              </div>
            </div>
          </div>

          {/* <PrimaryBtnStyle
            backgroundColor="#efa726"
            hoverBgColor="#d69215"
            btnTitle="Register"
          /> */}
        </form>
      </div>
    </main>
  );
}
