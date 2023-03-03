import { createContext, useContext, useState, useEffect } from 'react';
import {
  regions,
  provinces,
  cities,
  barangays,
} from 'select-philippines-address';

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

  const updateBarangay = (e) => {
    setUpdateUserDetails({
      ...updateUserDetails,
      barangay: e.target.selectedOptions[0].text,
    });
    getBarangay(e);
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
        getCity,
        getBarangay,
        updateProvince,
        updateCity,
        updateBarangay,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default function useAddressContext() {
  return useContext(AddressContext);
}
