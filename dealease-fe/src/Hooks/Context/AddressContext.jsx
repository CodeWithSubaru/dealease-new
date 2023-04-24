import { createContext, useContext, useState, useEffect } from 'react';
import { provinces, cities, barangays } from 'select-philippines-address';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

  // const region = () => {
  //   regions().then((response) => {
  //     setRegion(response);
  //   });
  // };

  const getProvince = (e) => {
    provinces('03').then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const getCity = (e) => {
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };
  const getBarangay = (e) => {
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  useEffect(() => {
    // region();
    getProvince();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        // regionData,
        provinceData,
        cityData,
        barangayData,
        // region,
        getProvince,
        getCity,
        getBarangay,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default function useAddressContext() {
  return useContext(AddressContext);
}
