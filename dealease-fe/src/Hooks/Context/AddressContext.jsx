import { createContext, useContext, useState, useEffect } from 'react';
import {
  regions,
  provinces,
  cities,
  barangays,
} from 'select-philippines-address';

const AddressContext = createContext('default');

export const AddressProvider = ({ children }) => {
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

  const region = () => {
    regions().then((response) => {
      setRegion(response[2]);
    });
  };

  const getProvince = (e) => {
    provinces(e.target.value).then((response) => {
      setProvince(response[1]);
      setCity([]);
      setBarangay([]);
    });
  };

  const getCity = (e) => {
    cities(e.target.value).then((response) => {
      setCity(response[13]);
    });
  };

  const getBarangay = (e) => {
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
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
        setBarangay,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default function useAddressContext() {
  return useContext(AddressContext);
}
