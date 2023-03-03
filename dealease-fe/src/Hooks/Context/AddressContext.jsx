import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  regions,
  provinces,
  cities,
  barangays,
} from 'select-philippines-address';

import axiosClient from '../../api/axios';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

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

  useEffect(() => {
    region();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        regionData,
        provinceData,
        cityData,
        barangayData,
        region,
        getProvince,
        province,
        updateProvince,
        getCity,
        city,
        updateCity,
        getBarangay,
        barangay,
        updateBarangay,
        brgy,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default function useAddressContext() {
  return useContext(AddressContext);
}
