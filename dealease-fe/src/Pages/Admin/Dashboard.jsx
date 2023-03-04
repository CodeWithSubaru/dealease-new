import { useEffect, useState } from "react";
import useAuthContext from "../../Hooks/Context/AuthContext";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import axiosClient from "../../api/axios";
import axios from "axios";

export function Dashboard() {
  const foundUserById = [];
  const [listOfUsersShortDetails, setlistOfUsersShortDetails] = useState([]);
  const [listOfUsersLongDetails, setlistOfUsersLongDetails] = useState([]);
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

  const [user, setUser] = useState({
    first_name: null,
    middle_name: null,
    last_name: null,
    ext_name: null,
    birth_date: null,
    contact_number: null,
    region: null,
    province: null,
    city: null,
    barangay: null,
    street: null,
    email: null,
    password: null,
    password_confirmation: null,
    user_type: null,
  });

  const [updateUserDetails, setUpdateUserDetails] = useState({
    user_id: null,
    first_name: null,
    middle_name: null,
    last_name: null,
    ext_name: null,
    email: null,
    user_type: null,
    birth_date: null,
    contact_number: null,
    region: null,
    province: null,
    city: null,
    barangay: null,
    street: null,
  });

  const { errors, setErrors } = useAuthContext();

  const createUser = (e) => {
    e.preventDefault();
    axiosClient
      .post("/admin/users", user)
      .then((resp) => {
        setlistOfUsersShortDetails([...user]);
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({});
        console.log(resp);
      })
      .catch((e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors(e.response.data.errors);
      });
  };

  // Editing User
  const findUser = (user_id) => {
    axiosClient.get("/admin/users/" + user_id).then((resp) => {
      console.log(resp);
      const flattenObject = {
        ...resp.data.foundUserById[0],
        ...resp.data.foundUserById[0].user_details,
      };

      setUpdateUserDetails(flattenObject);
    });
  };

  const editUser = (e) => {
    e.preventDefault();
    console.log(updateUserDetails);
    axiosClient
      .put("/admin/users/" + updateUserDetails.user_id, updateUserDetails)
      .then((resp) => console.log(resp))
      .catch((e) => console.log(e));
  };

  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const getProvince = (e) => {
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const province = (e) => {
    setUser({ ...user, region: e.target.selectedOptions[0].text });
    getProvince(e);
  };

  // updateUserDetails
  const updateProvince = (e) => {
    setUpdateUserDetails({
      ...updateUserDetails,
      region: e.target.selectedOptions[0].text,
    });
    getProvince(e);
  };

  const getCity = (e) => {
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const city = (e) => {
    setUser({ ...user, province: e.target.selectedOptions[0].text });
    getCity(e);
  };

  // updateUserDetails
  const updateCity = (e) => {
    setUpdateUserDetails({
      ...updateUserDetails,
      city: e.target.selectedOptions[0].text,
    });
    getCity(e);
  };

  const getBarangay = (e) => {
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  const barangay = (e) => {
    setUser({ ...user, city: e.target.selectedOptions[0].text });
    getBarangay(e);
  };

  const updateBarangay = (e) => {
    setUpdateUserDetails({
      ...updateUserDetails,
      barangay: e.target.selectedOptions[0].text,
    });
    getBarangay(e);
  };

  const brgy = (e) => {
    setUser({ ...user, barangay: e.target.selectedOptions[0].text });
  };

  // delete user
  const deleteUser = (user_id) => {
    console.log(user_id);
    axiosClient
      .delete("/admin/users/" + user_id)
      .then((resp) => {
        console.log(resp);
        setUser({ ...user });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    region();
    setErrors(null);
    // get user in db
    axiosClient.get("/admin/users").then((resp) => {
      setlistOfUsersShortDetails(resp.data.listOfUser);
      setlistOfUsersLongDetails(resp.data.listOfUser);
    });
  }, []);

  const viewCompleteDetails = () => {};

  return (
    <div>
      <div>Dashboard1</div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>fullname</th>
            <th>fullname</th>
            <th>fullname</th>
            <th>fullname</th>
            <th>fullname</th>
          </tr>
        </thead>
        <tbody>
          {listOfUsersShortDetails.map((user) => {
            return user ? (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.first_name}</td>
                <td>{user.middle_name}</td>
                <td>{user.last_name}</td>
                <td>{user.ext_name}</td>
                <td>
                  <button href="" onClick={viewCompleteDetails}>
                    View
                  </button>
                  <button onClick={() => findUser(user.user_id)}>Edit</button>
                  <button onClick={() => deleteUser(user.user_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ) : (
              ""
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>

      <br />
      <br />
      <br />
      <br />
      {/* Use Modal */}
      <h1>View</h1>
      {listOfUsersLongDetails.map((userView) => {
        return userView ? (
          <div key={userView.user_id}>
            <h4> Full Name</h4>
            <p>
              {userView.first_name} {userView.middle_name} {userView.last_name}{" "}
              {userView.ext_name}
            </p>
            <h4>User Account Details</h4>
            <p>{userView.email}</p>
            <h4>Address</h4>
            <p>
              {userView.user_details.street} {userView.user_details.barangay}
              {userView.user_details.city} {userView.user_details.province}
              {userView.user_details.region}
            </p>
            <h4>Contact Number</h4>
            <p>{userView.user_details.contact_number}</p>

            <h4>Birthday</h4>
            <p>{userView.user_details.birth_date}</p>
          </div>
        ) : (
          ""
        );
      })}
      <br />
      <br />
      <h1>New User</h1>
      <form className="form" onSubmit={createUser}>
        <div className="form-top">
          <div className="personal-details">
            <h3>Personal Details</h3>

            <hr />
            <div>
              <div> First Name * </div>
              <div>
                <input
                  type="text"
                  name="first_name"
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                  // required
                />
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.first_name && errors.first_name[0]}
            </small>

            <div>
              <div> Middle Name </div>
              <div>
                <input
                  type="text"
                  name="middle_name"
                  onChange={(e) =>
                    setUser({ ...user, middle_name: e.target.value })
                  }
                  // required
                />
              </div>
            </div>

            <div>
              <div> Last Name * </div>
              <div>
                <input
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.target.value })
                  }
                  // required
                />
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.last_name && errors.last_name[0]}
            </small>

            <div>
              <div> Extension Name </div>
              <div>
                <input
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setUser({ ...user, ext_name: e.target.value })
                  }
                  // required
                />
              </div>
            </div>

            <div>
              <div> Birthday </div>
              <div>
                <input
                  type="date"
                  min="1930-01-01"
                  max="2012-12-31"
                  onChange={(e) =>
                    setUser({ ...user, birth_date: e.target.value })
                  }
                />
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.birth_date && errors.birth_date[0]}
            </small>

            <div className="mb-1">
              <div> Contact Number </div>
              <div>
                <input
                  type="number"
                  id="#number"
                  onChange={(e) =>
                    setUser({ ...user, contact_number: e.target.value })
                  }
                />
              </div>
            </div>
            <small className="errMsg" v-if="errors.contact_number">
              {errors && errors.contact_number && errors.contact_number[0]}
            </small>
          </div>

          <div className="address-details">
            <h3>Address Details</h3>
            <hr />
            <div>
              <div>Region</div>
              <div>
                <select
                  onChange={province}
                  onSelect={region}
                  defaultValue={"default"}
                >
                  <option value="default">Select Region</option>
                  {regionData &&
                    regionData.map((item) => (
                      <option key={item.region_code} value={item.region_code}>
                        {item.region_name}
                      </option>
                    ))}
                </select>
                <br />
              </div>
            </div>
            <small className="errMsg" v-if="errors.region">
              {errors && errors.region && errors.region[0]}
            </small>

            <div>
              <div>Province</div>
              <div>
                <select onChange={city} defaultValue={"default"}>
                  <option value="default">Select Province</option>
                  {provinceData &&
                    provinceData.length > 0 &&
                    provinceData.map((item) => (
                      <option
                        key={item.province_code}
                        value={item.province_code}
                      >
                        {item.province_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.province && errors.province[0]}
            </small>

            <div>
              <div>City/Town</div>
              <div>
                <select onChange={barangay} defaultValue={"default"}>
                  <option value="default">Select City</option>
                  {cityData &&
                    cityData.length > 0 &&
                    cityData.map((item) => (
                      <option key={item.city_code} value={item.city_code}>
                        {item.city_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.city && errors.city[0]}
            </small>

            <div>
              <div>Barangay</div>
              <div>
                <select onChange={brgy} defaultValue={"default"}>
                  <option value="default">Select Barangay</option>
                  {barangayData &&
                    barangayData.length > 0 &&
                    barangayData.map((item) => (
                      <option key={item.brgy_code} value={item.brgy_code}>
                        {item.brgy_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.barangay && errors.barangay[0]}
            </small>

            <div className="">
              <div>Street</div>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setUser({ ...user, street: e.target.value })}
                />
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.street && errors.street[0]}
            </small>
          </div>
        </div>

        <div className="form-bottom">
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

            <div>
              <div>User type</div>
              <div>
                <select
                  defaultValue={"default"}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      user_type: e.target.value,
                    })
                  }
                >
                  <option value={"default"} disabled>
                    Choose an option
                  </option>
                  <option value={"is_buyer 1"}>Buyer</option>
                  <option value={"is_seller 1"}>Seller</option>
                </select>
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.user_type && errors.user_type[0]}
            </small>
          </div>
        </div>

        <PrimaryBtnStyle
          backgroundColor="#efa726"
          hoverBgColor="#d69215"
          btnTitle="Create"
        />
      </form>

      <br />
      <br />
      <br />
      <h1>Edit User</h1>
      <form className="form" onSubmit={editUser}>
        <div className="form-top">
          <div className="personal-details">
            <h3>Personal Details</h3>

            <hr />

            <input
              type="text"
              name="user_id"
              defaultValue={updateUserDetails.user_id}
              disabled
            />

            <div>
              <div> First Name * </div>
              <div>
                <input
                  type="text"
                  name="first_name"
                  defaultValue={updateUserDetails.first_name}
                  onChange={(e) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      first_name: e.target.value,
                    })
                  }
                  // required
                />
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.first_name && errors.first_name[0]}
            </small>

            <div>
              <div> Middle Name </div>
              <div>
                <input
                  type="text"
                  name="middle_name"
                  defaultValue={updateUserDetails.middle_name}
                  onChange={(e) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      middle_name: e.target.value,
                    })
                  }
                  // required
                />
              </div>
            </div>

            <div>
              <div> Last Name * </div>
              <div>
                <input
                  type="text"
                  name="last_name"
                  defaultValue={updateUserDetails.last_name}
                  onChange={(e) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      last_name: e.target.value,
                    })
                  }
                  // required
                />
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.last_name && errors.last_name[0]}
            </small>

            <div>
              <div> Extension Name </div>
              <div>
                <input
                  type="text"
                  name="ext_name"
                  defaultValue={updateUserDetails.ext_name}
                  onChange={(e) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      ext_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <div> Birthday </div>
              <div>
                <input
                  type="date"
                  min="1930-01-01"
                  max="2012-12-31"
                  name="birth_date"
                  defaultValue={
                    updateUserDetails ? updateUserDetails.birth_date : ""
                  }
                  onSelect={(e) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      birth_date: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.birth_date && errors.birth_date[0]}
            </small>

            <div className="mb-1">
              <div> Contact Number </div>
              <div>
                <input
                  type="text"
                  id="number"
                  name="contact_number"
                  defaultValue={
                    updateUserDetails ? updateUserDetails.contact_number : ""
                  }
                  onChange={(e) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      contact_number: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <small className="errMsg" v-if="errors.contact_number">
              {errors && errors.contact_number && errors.contact_number[0]}
            </small>
          </div>

          <div className="address-details">
            <h3>Address Details</h3>
            <hr />
            <div>
              <div>Region</div>
              <div>
                <select
                  onChange={updateProvince}
                  onSelect={region}
                  defaultValue={
                    updateUserDetails ? updateUserDetails.region : ""
                  }
                >
                  <option
                    value={updateUserDetails ? updateUserDetails.region : ""}
                  >
                    {updateUserDetails ? updateUserDetails.region : ""}
                  </option>
                  {regionData &&
                    regionData.map((item) => (
                      <option key={item.region_code} value={item.region_code}>
                        {item.region_name}
                      </option>
                    ))}
                </select>
                <br />
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.region && errors.region[0]}
            </small>

            <div>
              <div>Province</div>
              <div>
                <select
                  onChange={updateCity}
                  defaultValue={
                    updateUserDetails ? updateUserDetails.province : ""
                  }
                >
                  <option
                    value={updateUserDetails ? updateUserDetails.province : ""}
                  >
                    {updateUserDetails ? updateUserDetails.province : ""}
                  </option>
                  {provinceData &&
                    provinceData.length > 0 &&
                    provinceData.map((item) => (
                      <option
                        key={item.province_code}
                        value={item.province_code}
                      >
                        {item.province_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.province && errors.province[0]}
            </small>

            <div>
              <div>City/Town</div>
              <div>
                <select
                  onChange={updateBarangay}
                  defaultValue={updateUserDetails ? updateUserDetails.city : ""}
                >
                  <option
                    value={updateUserDetails ? updateUserDetails.city : ""}
                  >
                    {updateUserDetails ? updateUserDetails.city : ""}
                  </option>
                  {cityData &&
                    cityData.length > 0 &&
                    cityData.map((item) => (
                      <option key={item.city_code} value={item.city_code}>
                        {item.city_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.city && errors.city[0]}
            </small>

            <div>
              <div>Barangay</div>
              <div>
                <select
                  onChange={updateBarangay}
                  defaultValue={
                    updateUserDetails ? updateUserDetails.barangay : ""
                  }
                >
                  <option
                    value={updateUserDetails ? updateUserDetails.barangay : ""}
                  >
                    {updateUserDetails ? updateUserDetails.barangay : ""}
                  </option>
                  {barangayData &&
                    barangayData.length > 0 &&
                    barangayData.map((item) => (
                      <option key={item.brgy_code} value={item.brgy_code}>
                        {item.brgy_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.barangay && errors.barangay[0]}
            </small>

            <div className="">
              <div>Street</div>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  defaultValue={
                    updateUserDetails ? updateUserDetails.street : ""
                  }
                  onChange={(e) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      street: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.street && errors.street[0]}
            </small>
          </div>
        </div>

        <div className="form-bottom">
          <div className="account-details">
            <h3>Account Details</h3>
            <hr />
            <div>
              <div> Email * </div>
              <div>
                <input
                  type="email"
                  name="email"
                  defaultValue={updateUserDetails.email}
                  onChange={(e) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      email: e.target.value,
                    })
                  }
                  // required
                />
              </div>
            </div>
            <small className="errMsg" v-if="errors.email">
              {errors && errors.email && errors.email[0]}
            </small>

            <div>
              <div>User type</div>

              <div>
                <select
                  defaultValue={
                    updateUserDetails.role_type === "Admin"
                      ? updateUserDetails.role_type
                      : updateUserDetails.is_seller
                      ? updateUserDetails.is_buyer
                      : ""
                  }
                  onChange={(e) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      user_type: e.target.value,
                    })
                  }
                >
                  <option
                    value={
                      updateUserDetails.role_type === "Admin"
                        ? updateUserDetails.role_type
                        : updateUserDetails.is_seller
                        ? updateUserDetails.is_buyer
                        : ""
                    }
                    disabled
                  >
                    {updateUserDetails.role_type === "Admin"
                      ? updateUserDetails.role_type
                      : updateUserDetails.is_seller === "0"
                      ? updateUserDetails.is_buyer
                      : updateUserDetails.is_seller}
                  </option>
                  <option value={"admin"}>Admin</option>
                  <option value={"buyer"}>Buyer</option>
                  <option value={"seller"}>Seller</option>
                </select>
              </div>
            </div>
            <small className="errMsg">
              {errors && errors.user_type && errors.user_type[0]}
            </small>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setUpdateUserDetails({ ...foundUserById })}
        >
          Cancel
        </button>

        {/* <PrimaryBtnStyle
          backgroundColor='#efa726'
          hoverBgColor='#d69215'
          btnTitle='Update'
          onClick={() =>
            setUpdateUserDetails({
              ...updateUserDetails,
              user_id: user.user_id,
            })
          }
        /> */}
      </form>
    </div>
  );
}
